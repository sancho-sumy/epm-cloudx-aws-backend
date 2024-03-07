import { BatchGetCommandInput } from '@aws-sdk/lib-dynamodb';
import { ResponseMessage } from '@enums/responseMessages.enum';
import { StatusCode } from '@enums/statusCode.enums';
import { formatJSONResponse } from '@libs/apiGateway';
import { AppError } from '@libs/appError';
import { middyfy } from '@libs/lambda';
import { GetProductByIdResponse } from '@models/index';
import { batchGet } from '@services/database.service';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import 'dotenv/config';

const getProductsById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
	const productTable = process.env.PRODUCTS_TABLE;
	const stocksTable = process.env.STOCKS_TABLE;
	const productId = event.pathParameters.productId;

	const params: BatchGetCommandInput = {
		RequestItems: {
			[productTable]: {
				Keys: [{ id: productId }]
			},
			[stocksTable]: {
				Keys: [{ product_id: productId }]
			}
		}
	};

	const responseRaw = await batchGet(params);

	console.log('test', responseRaw);

	const { products, stocks } = responseRaw.Responses as unknown as GetProductByIdResponse;

	if (products.length < 1) {
		throw new AppError(ResponseMessage.GET_PRODUCT_FAIL, StatusCode.NOT_FOUND);
	}

	return formatJSONResponse(
		{
			product: {
				...products[0],
				count: stocks[0]?.count ?? 0
			}
		},
		200
	);
};

export const main = middyfy(getProductsById);
