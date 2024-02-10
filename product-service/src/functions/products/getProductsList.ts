import { formatJSONResponse } from '@libs/api-gateway';
import { AppError } from '@libs/appError';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import mockedProducts from '../../mocks/products.json';

const getProductsList = async (
	_event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	if (mockedProducts.length === 0) {
		throw new AppError(`There is no products`, 404);
	}

	return formatJSONResponse(
		{
			products: mockedProducts
		},
		200
	);
};

export const main = middyfy(getProductsList);
