export const createProductSchema = {
	title: 'Create product',
	description: 'Creation of new product',
	type: 'object',
	properties: {
		title: { type: 'string' },
		description: { type: 'string' },
		price: { type: 'number', min: 0 },
		count: { type: 'number', min: 0 }
	},
	required: ['title', 'description', 'price', 'count']
} as const;
