import { ResponseMessage, StatusCode } from '@enums/index';
import { AppError } from './appError';

export const internalErrorHandler = (errorMessage: string) => {
	console.error(errorMessage);
	throw new AppError(ResponseMessage.INTERNAL_ERROR, StatusCode.ERROR, { expose: true });
};
