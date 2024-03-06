export class AppError extends Error {
	statusCode: number;
	expose: boolean;
	constructor(
		message: string = '',
		statusCode: number = 400,
		options?: { expose: boolean } | undefined
	) {
		super(message);
		this.statusCode = statusCode;
		this.expose = options?.expose ?? statusCode < 500;
	}
}
