import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
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
	ScanCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { AppError } from '@libs/appError';
import { ResponseMessage, StatusCode } from 'src/enums';

type Item = Record<string, string>;

const client = new DynamoDBClient({ region: 'eu-central-1' });
const docClient = DynamoDBDocumentClient.from(client);

export default class DatabaseService {
	getItem = async ({ tableName, key }: Item): Promise<GetCommandOutput> => {
		const params = {
			TableName: tableName,
			Key: {
				id: key
			}
		};

		const results = await this.get(params);

		if (Object.keys(results).length) {
			return results;
		}
		console.log('Item does not exist');
		throw new AppError(ResponseMessage.GET_ITEM_ERROR, StatusCode.NOT_FOUND);
	};

	create = async (params: PutCommandInput): Promise<PutCommandOutput> => {
		try {
			return await docClient.send(new PutCommand(params));
		} catch (error) {
			console.error('create-error', error);
			throw new AppError(`Create-error: ${error}`, StatusCode.ERROR);
		}
	};

	get = async (params: GetCommandInput): Promise<GetCommandOutput> => {
		try {
			return await docClient.send(new GetCommand(params));
		} catch (error) {
			throw new AppError(`Get-error: ${error}`, StatusCode.ERROR);
		}
	};

	delete = async (params: DeleteCommandInput): Promise<DeleteCommandOutput> => {
		try {
			return await docClient.send(new DeleteCommand(params));
		} catch (error) {
			throw new AppError(`Delete-error: ${error}`, StatusCode.ERROR);
		}
	};

	scan = async (params: ScanCommandInput): Promise<ScanCommandOutput> => {
		try {
			return await docClient.send(new ScanCommand(params));
		} catch (error) {
			throw new AppError(`Scan-error: ${error}`, StatusCode.ERROR);
		}
	};
}
