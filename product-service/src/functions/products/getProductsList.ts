import { ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { formatJSONResponse } from '@libs/apiGateway';
import { AppError } from '@libs/appError';
import { middyfy } from '@libs/lambda';
import { Product, Stock } from '@models/index';
import { scan } from '@services/database.service';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import 'dotenv/config';

const getProductsList = async (): Promise<APIGatewayProxyResultV2> => {
	const paramsProducts: ScanCommandInput = {
		TableName: process.env.PRODUCTS_TABLE
	};
	const paramsStocks: ScanCommandInput = {
		TableName: process.env.STOCKS_TABLE
	};

	const responseProducts = await scan(paramsProducts);
	const responseStocks = await scan(paramsStocks);

	console.log(responseProducts);
	console.log(responseStocks);

	const productsList = responseProducts.Items.map((product: Product) => {
		const { count } = (responseStocks.Items as Stock[]).find(
			(stock: Stock) => stock.product_id === product.id
		) ?? { count: 0 };

		return {
			...product,
			count
		};
	});

	if (productsList.length === 0) {
		throw new AppError(`There is no products`, 404);
	}
	console.log(productsList);

	return formatJSONResponse(
		{
			products: productsList
		},
		200
	);
};

export const main = middyfy(getProductsList);
