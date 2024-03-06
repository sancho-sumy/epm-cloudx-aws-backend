import { Product } from './product.model';
import { Stock } from './stock.model';

export interface GetProductByIdResponse {
	products: Product[];
	stocks: Stock[];
}
