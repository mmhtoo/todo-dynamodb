import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';
import { dynamoDBFactory } from './factory/dynamodb.factory';

@Module({
  providers: [
    {
      provide: DynamoDBClient,
      useFactory: dynamoDBFactory,
    },
  ],
})
export default class DynamoDBModule {}
