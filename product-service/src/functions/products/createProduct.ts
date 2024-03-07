import { TransactWriteCommandInput } from '@aws-sdk/lib-dynamodb';
import { ResponseMessage } from '@enums/responseMessages.enum';
import { StatusCode } from '@enums/statusCode.enums';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createProductSchema } from '@schemas/index';
import { transactWrite } from '@services/database.service';
import 'dotenv/config';
import { buildYup } from 'schema-to-yup';
import { v4 as uuidv4 } from 'uuid';

const yupSchema = buildYup(createProductSchema);

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof createProductSchema> = async (
	event
) => {
	const { title, description, price, count } = event.body;
	const productId = uuidv4();
	const product = { id: productId, title, description, price };

	const params: TransactWriteCommandInput = {
		TransactItems: [
			{
				Put: {
					TableName: process.env.PRODUCTS_TABLE,
					Item: {
						...product
					}
				}
			},
			{
				Put: {
					TableName: process.env.STOCKS_TABLE,
					Item: {
						product_id: productId,
						count
					}
				}
			}
		]
	};

	await transactWrite(params);

	return formatJSONResponse(
		{
			message: ResponseMessage.CREATE_PRODUCT_SUCCESS,
			product: { ...product, count }
		},
		StatusCode.OK
	);
};

export const main = middyfy(createProduct, yupSchema);
