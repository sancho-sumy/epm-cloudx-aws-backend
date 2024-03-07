import { ResponseMessage } from '@enums/responseMessages.enum';
import { StatusCode } from '@enums/statusCode.enums';
import { batchGet } from '@services/database.service';
import { mockedContext } from '../../../mocks/contextMock';
import { eventMock } from '../../../mocks/eventMock';
import mockedProducts from '../../../mocks/mockedProducts.json';
import mockedStocks from '../../../mocks/mockedStocks.json';
import { main as getProductsById } from '../getProductsById';

jest.mock('@services/database.service', () => ({
	batchGet: jest.fn()
}));

const mockedResponses = {
	Responses: { products: [mockedProducts[0]], stocks: [mockedStocks[0]] }
};
const mockedResponsesWithoutCount = {
	Responses: { products: [mockedProducts[0]], stocks: [] }
};
const mockedEmptyResponses = {
	Responses: { products: [], stocks: [] }
};

describe('getProductsById', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});

	it('should return product if provided id matches product id in database', async () => {
		const newEventMock = {
			...eventMock,
			pathParameters: { productId: '1111' }
		};
		(batchGet as jest.Mock).mockResolvedValueOnce(mockedResponses);

		const result = await getProductsById(newEventMock, mockedContext);

		expect(result).toBeTruthy();
	});

	it("should return error message with status code 404 if provided id don't matches product id in database", async () => {
		const productId = '3333';
		const newEventMock = {
			...eventMock,
			pathParameters: { productId: productId }
		};
		const expectedResponse = {
			body: ResponseMessage.GET_PRODUCT_FAIL,
			headers: { 'Content-Type': 'text/plain' },
			statusCode: StatusCode.NOT_FOUND
		};
		(batchGet as jest.Mock).mockResolvedValueOnce(mockedEmptyResponses);

		const result = await getProductsById(newEventMock, mockedContext);

		expect(result).toMatchObject(expectedResponse);
	});

	it('should set count to 0 if stocks for product is not available', async () => {
		const newEventMock = {
			...eventMock,
			pathParameters: { productId: '1111' }
		};
		(batchGet as jest.Mock).mockResolvedValueOnce(mockedResponsesWithoutCount);

		const result = await getProductsById(newEventMock, mockedContext);

		const expectedProduct = JSON.parse(result.body).product;

		expect(expectedProduct.count).toBe(0);
	});
});
