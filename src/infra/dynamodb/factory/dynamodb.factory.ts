import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamoDBFactory = () => new DynamoDBClient();
