import { handlerPath } from '@libs/handlerResolver';

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

export const createProduct = {
	handler: `${handlerPath(__dirname)}/createProduct.main`,
	events: [
		{
			httpApi: {
				method: 'post',
				path: '/products',
				summary: 'Create product',
				description: 'Create new product and return it',
				swaggerTags: ['Products'],
				bodyType: 'CreateProductBodyType'
			}
		}
	]
};
