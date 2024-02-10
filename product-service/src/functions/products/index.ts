import { handlerPath } from '@libs/handler-resolver';

export const getProductsList = {
	handler: `${handlerPath(__dirname)}/getProductsList.main`,
	events: [
		{
			httpApi: {
				method: 'get',
				path: '/products',
				summary: 'All products',
				description: 'Return a list of products',
				swaggerTags: ['Products']
			}
		}
	]
};

export const getProductsById = {
	handler: `${handlerPath(__dirname)}/getProductsById.main`,
	events: [
		{
			httpApi: {
				method: 'get',
				path: '/products/{productId}',
				summary: 'Product by ID',
				description: 'Return a product by ID',
				swaggerTags: ['Products']
			}
		}
	]
};
