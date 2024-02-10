import { formatJSONResponse } from '@libs/api-gateway';
import { AppError } from '@libs/appError';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Product } from 'src/models/product.model';
import mockedProducts from '../../mocks/products.json';

const getProductsById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
	const productId = event.pathParameters.productId;
	const products: Product[] = JSON.parse(JSON.stringify(mockedProducts));
	const product = products.find((product) => {
		return product.id === productId;
	});

	if (!product) {
		throw new AppError(`Product with ID: "${productId}" not found`, 404);
	}

	return formatJSONResponse(
		{
			products: product
		},
		200
	);
};

export const main = middyfy(getProductsById);
