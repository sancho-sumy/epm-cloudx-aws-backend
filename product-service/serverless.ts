import type { AWS } from '@serverless/typescript';

import { getProductsById, getProductsList } from '@functions/index';

import dynamoDbTables from '@resources/dynamodb-tables';

const serverlessConfiguration: AWS = {
	service: 'product-service',
	frameworkVersion: '3',
	useDotenv: true,
	plugins: ['serverless-offline', 'serverless-esbuild', 'serverless-auto-swagger'],
	provider: {
		name: 'aws',
		runtime: 'nodejs20.x',
		region: 'eu-central-1',
		stage: 'dev',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			PRODUCTS_TABLE: '${env:PRODUCTS_TABLE_NAME}',
			STOCKS_TABLE: '${env:STOCKS_TABLE_NAME}'
		},
		httpApi: {
			cors: true
		},
		iam: {
			role: {
				name: 'DynamoDB_Access_Role',
				statements: [
					{
						Action: [
							'dynamodb:PutItem',
							'dynamodb:GetItem',
							'dynamodb:DeleteItem',
							'dynamodb:Scan'
						],
						Effect: 'Allow',
						Resource: [
							{ 'Fn::GetAtt': ['ProductsTable', 'Arn'] },
							{ 'Fn::GetAtt': ['StocksTable', 'Arn'] }
						]
					}
				]
			}
		}
	},
	functions: { getProductsList, getProductsById },
	resources: {
		Resources: {
			...dynamoDbTables
		}
	},
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
			title: 'CloudX AWS backend',
			description: 'Backend for EPAM CloudX AWS course',
			typefiles: []
		}
	}
};

module.exports = serverlessConfiguration;
