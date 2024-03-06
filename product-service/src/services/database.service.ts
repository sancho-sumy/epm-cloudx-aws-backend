import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
	BatchGetCommand,
	BatchGetCommandInput,
	BatchGetCommandOutput,
	BatchWriteCommand,
	BatchWriteCommandInput,
	BatchWriteCommandOutput,
	DeleteCommand,
	DeleteCommandInput,
	DeleteCommandOutput,
	DynamoDBDocumentClient,
	GetCommand,
	GetCommandInput,
	GetCommandOutput,
	PutCommand,
	PutCommandInput,
	PutCommandOutput,
	ScanCommand,
	ScanCommandInput,
	ScanCommandOutput,
	TransactWriteCommand,
	TransactWriteCommandInput,
	TransactWriteCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { ResponseMessage, StatusCode } from '@enums/index';
import { AppError } from '@libs/appError';
import { internalErrorHandler } from '@libs/intenalErrorHandler';

type Item = Record<string, string>;

const client = new DynamoDBClient({ region: 'eu-central-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const getItem = async ({ tableName, key }: Item): Promise<GetCommandOutput> => {
	const params = {
		TableName: tableName,
		Key: {
			id: key
		}
	};

	const results = await get(params);

	if (Object.keys(results).length) {
		return results;
	}
	console.log('Item does not exist');
	throw new AppError(ResponseMessage.GET_ITEM_ERROR, StatusCode.NOT_FOUND);
};

export const create = async (params: PutCommandInput): Promise<PutCommandOutput> => {
	try {
		return await docClient.send(new PutCommand(params));
	} catch (error) {
		internalErrorHandler(`Create-error: ${error}`);
	}
};

export const get = async (params: GetCommandInput): Promise<GetCommandOutput> => {
	try {
		return await docClient.send(new GetCommand(params));
	} catch (error) {
		internalErrorHandler(`Get-error: ${error}`);
	}
};

export const batchGet = async (params: BatchGetCommandInput): Promise<BatchGetCommandOutput> => {
	try {
		return await docClient.send(new BatchGetCommand(params));
	} catch (error) {
		internalErrorHandler(`Batch-get-error: ${error}`);
	}
};

export const batchCreate = async (
	params: BatchWriteCommandInput
): Promise<BatchWriteCommandOutput> => {
	try {
		return await docClient.send(new BatchWriteCommand(params));
	} catch (error) {
		internalErrorHandler(`Batch-write-error: ${error}`);
	}
};

export const remove = async (params: DeleteCommandInput): Promise<DeleteCommandOutput> => {
	try {
		return await docClient.send(new DeleteCommand(params));
	} catch (error) {
		internalErrorHandler(`Delete-error: ${error}`);
	}
};

export const scan = async (params: ScanCommandInput): Promise<ScanCommandOutput> => {
	try {
		return await docClient.send(new ScanCommand(params));
	} catch (error) {
		internalErrorHandler(`Scan-error: ${error}`);
	}
};

export const transactWrite = async (
	params: TransactWriteCommandInput
): Promise<TransactWriteCommandOutput> => {
	try {
		return await docClient.send(new TransactWriteCommand(params));
	} catch (error) {
		internalErrorHandler(`Scan-error: ${error}`);
	}
};
