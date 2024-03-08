import { Schema } from 'yup';

export const schemaValidator = (schema: Schema) => {
	const before = async (request) => {
		try {
			if (schema) {
				const { body } = request.event;

				schema.validateSync(body, { abortEarly: false, strict: true });

				return Promise.resolve();
			}
		} catch (e) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					errors: e.errors
				})
			};
		}
	};

	return {
		before
	};
};
