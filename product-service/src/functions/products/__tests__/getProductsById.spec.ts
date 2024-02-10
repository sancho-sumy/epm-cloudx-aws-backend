import { mockedContext } from '../../../mocks/contextMock';
import { eventMock } from '../../../mocks/eventMock';
import { main as getProductsById } from '../getProductsById';

jest.mock('../../../mocks/products.json', () => require('../../../mocks/mockedProducts.json'), {
	virtual: true
});

describe('getProductsById', () => {
	it('should return product if provided id matches product id in database', async () => {
		const newEventMock = { ...eventMock, pathParameters: { productId: '1111' } };

		const result = await getProductsById(newEventMock, mockedContext, () => {});

		expect(result).toBeTruthy();
	});

	it("should return error message with status code 404 if provided id don't matches product id in database", async () => {
		const productId = '3333';
		const newEventMock2 = { ...eventMock, pathParameters: { productId: productId } };
		const expectedResponse = {
			body: `Product with ID: "${productId}" not found`,
			headers: { 'Content-Type': 'text/plain' },
			statusCode: 404
		};

		const result = await getProductsById(newEventMock2, mockedContext, () => {});

		expect(result).toMatchObject(expectedResponse);
	});
});
