import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { create } from '@services/database.service';
import fs from 'fs';
import { Product } from 'src/models/product.model';
import { v4 as uuidv4 } from 'uuid';

console.log('Importing Sample products into DynamoDB. Please wait...');

const importData: Product[] = JSON.parse(fs.readFileSync('../mocks/products.json', 'utf8'));

importData.forEach(async (product: Product) => {
	const productId = uuidv4();

	const paramsProducts: PutCommandInput = {
		TableName: 'products',
		Item: {
			id: productId,
			title: product.title,
			description: product.description,
			price: product.price
		}
	};

	const paramsStocks: PutCommandInput = {
		TableName: 'stocks',
		Item: {
			product_id: productId,
			count: randomInteger(1, 20)
		}
	};

	try {
		await create(paramsProducts);
		await create(paramsStocks);

		console.log(`Put product succeeded: ${product.title}`);
	} catch (error) {
		console.error(
			`Unable to add product: ${product.title}. Error JSON: ${JSON.stringify(error, null, 2)}`
		);
	}
});

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
