import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { dynamoDBFactory } from '../factory/dynamodb.factory';
import { TODO_TABLE } from '../constant';

async function createTodosTable(client: DynamoDBClient) {
  try {
    console.log('Started Executing createTodosTable() ');
    const command = new CreateTableCommand({
      TableName: TODO_TABLE,
      AttributeDefinitions: [
        {
          AttributeName: 'Id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'Id',
          KeyType: 'HASH',
        },
      ],
      DeletionProtectionEnabled: false,
      BillingMode: 'PAY_PER_REQUEST',
    });
    await client.send(command);
  } catch (e) {
    console.log('Failed Executing createTodosTable() ', e);
    throw e;
  } finally {
    console.log('Finished Executing createTodosTable() ');
  }
}

async function main() {
  console.log('Started Executing seeder.ts ');
  const client = dynamoDBFactory();
  const promises: Array<(client: DynamoDBClient) => Promise<void>> = [
    createTodosTable,
  ];
  const preparedPromises = promises.map((promise) => promise(client));
  await Promise.all(preparedPromises);
}
main();
