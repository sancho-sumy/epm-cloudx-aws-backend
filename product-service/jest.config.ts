/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	transform: {
		'^.+\\.(ts|tsx|js)$': 'ts-jest'
	},
	moduleNameMapper: {
		'@functions/(.*)': ['<rootDir>/src/functions/$1'],
		'@libs/(.*)': ['<rootDir>/src/libs/$1'],
		'@enums/(.*)': ['<rootDir>/src/enums/$1'],
		'@models/(.*)': ['<rootDir>/src/models/$1'],
		'@services/(.*)': ['<rootDir>/src/services/$1'],
		'@schemas/(.*)': ['<rootDir>/src/schemas/$1'],
		'^@middy/core$': '<rootDir>/node_modules/@middy/core',
		'^@middy/util$': '<rootDir>/node_modules/@middy/util',
		'^@middy/http-error-handler$': '<rootDir>/node_modules/@middy/http-error-handler',
		'^@middy/input-output-logger$': '<rootDir>/node_modules/@middy/input-output-logger'
	},
	transformIgnorePatterns: [
		'/node_modules/(?!(@middy/core|@middy/http-error-handler|@middy/util|@middy/input-output-logger)/)'
	]
};

export default config;
