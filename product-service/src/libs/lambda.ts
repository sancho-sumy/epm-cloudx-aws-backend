import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import inputOutputLogger from '@middy/input-output-logger';

import pino from 'pino';
import { schemaValidator } from './schemaValidator';

const logger = pino();

export const middyfy = (handler, inputValidationSchema?) => {
	return middy(handler)
		.use(
			inputOutputLogger({
				logger: (request) => {
					if (request.event) {
						const child = logger.child(request.context);
						child.info(request.event);
					}
				},
				awsContext: true
			})
		)
		.use(middyJsonBodyParser())
		.use(schemaValidator(inputValidationSchema))
		.use(httpErrorHandler());
};
