import { ResponseMessage } from '@enums/responseMessages.enum';
import { StatusCode } from '@enums/statusCode.enums';
import { scan } from '@services/database.service';
import { mockedContext } from '../../../mocks/contextMock';
import { eventMock } from '../../../mocks/eventMock';
import mockedProducts from '../../../mocks/mockedProducts.json';
import mockedStocks from '../../../mocks/mockedStocks.json';
import { main as getProductsList } from '../getProductsList';

jest.mock('@services/database.service', () => ({
	scan: jest.fn()
}));

const mockedProductsResponse = {
	Items: [...mockedProducts]
};
const mockedStocksResponse = {
	Items: [...mockedStocks]
};
const mockedProductsEmptyResponse = {
	Items: []
};
const mockedStocksEmptyResponse = {
	Items: []
};
let newEventMock: typeof eventMock;

describe('getProductsList', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
		newEventMock = { ...eventMock };
	});

	it('should return a full list of products', async () => {
		(scan as jest.Mock)
			.mockResolvedValueOnce(mockedProductsResponse)
			.mockResolvedValueOnce(mockedStocksResponse);

		const result = await getProductsList(newEventMock, mockedContext);

		const expectedProducts = JSON.parse(result.body).products;

		expect(expectedProducts).toHaveLength(2);
		jest.resetAllMocks();
	});

	it('should set count to 0 if stocks for product is not available', async () => {
		(scan as jest.Mock)
			.mockResolvedValueOnce(mockedProductsResponse)
			.mockResolvedValueOnce(mockedStocksEmptyResponse);

		const result = await getProductsList(newEventMock, mockedContext);

		const expectedProducts = JSON.parse(result.body).products;

		expect(expectedProducts[0].count).toBe(0);
	});

	it('should return error message with status code 404 if there is no any products', async () => {
		const expectedResponse = {
			body: ResponseMessage.GET_PRODUCTS_FAIL,
			headers: { 'Content-Type': 'text/plain' },
			statusCode: StatusCode.NOT_FOUND
		};
		(scan as jest.Mock)
			.mockResolvedValueOnce(mockedProductsEmptyResponse)
			.mockResolvedValueOnce(mockedStocksEmptyResponse);

		const result = await getProductsList(newEventMock, mockedContext);

		expect(result).toMatchObject(expectedResponse);
	});
});
