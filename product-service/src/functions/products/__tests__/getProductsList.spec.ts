import { mockedContext } from '../../../mocks/contextMock';
import { eventMock } from '../../../mocks/eventMock';
import { main as getProductsList } from '../getProductsList';

jest.mock('../../../mocks/products.json', () => require('../../../mocks/mockedProducts.json'), {
	virtual: true
});

describe('getProductsList', () => {
	it('should return a full list of products', async () => {
		const result = await getProductsList(eventMock, mockedContext, () => {});

		const expectedProducts = JSON.parse(result.body).products;

		expect(expectedProducts).toHaveLength(2);
	});
});
