import { transactWrite } from '@services/database.service';
import * as uuid from 'uuid';
import { mockedContext } from '../../../mocks/contextMock';
import { eventMock } from '../../../mocks/eventMock';
import { main as createProduct } from '../createProduct';

jest.mock('@services/database.service', () => ({
	transactWrite: jest.fn()
}));
jest.mock('uuid');

let newEventMock: typeof eventMock;

describe('createProduct', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});

	it('call transaction write method with the provided in body data', async () => {
		const mockedUuid = '1234-5678-9876';
		const mockedProduct = {
			title: 'Test product 1',
			description: 'Test description',
			price: 100
		};
		const mockedStocks = {
			count: 15
		};
		newEventMock = {
			...eventMock,
			body: JSON.stringify({ ...mockedProduct, ...mockedStocks })
		};
		const expectedResult = {
			TransactItems: [
				{
					Put: {
						TableName: process.env.PRODUCTS_TABLE,
						Item: {
							...mockedProduct,
							id: mockedUuid
						}
					}
				},
				{
					Put: {
						TableName: process.env.STOCKS_TABLE,
						Item: {
							product_id: mockedUuid,
							...mockedStocks
						}
					}
				}
			]
		};
		jest.spyOn(uuid, 'v4').mockReturnValue(mockedUuid);

		await createProduct(newEventMock, mockedContext);

		expect(transactWrite).toHaveBeenCalledWith(expectedResult);
	});
});
