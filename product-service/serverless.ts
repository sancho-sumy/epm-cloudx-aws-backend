import type { AWS } from '@serverless/typescript';

import { getProductsById, getProductsList } from '@functions/index';

const serverlessConfiguration: AWS = {
	service: 'product-service',
	frameworkVersion: '3',
	plugins: ['serverless-offline', 'serverless-auto-swagger', 'serverless-esbuild'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'eu-central-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
		},
		httpApi: {
			cors: true
		}
	},
	// import the function via paths
	functions: { getProductsList, getProductsById },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10
		},
		autoswagger: {
			description: 'Backend for EPAM CloudX AWS course',
			title: 'CloudX AWS backend',
			typefiles: []
		}
	}
};

module.exports = serverlessConfiguration;
