import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';
import { dynamoDBFactory } from './factory/dynamodb.factory';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { documentFactory } from './factory/document.factory';

@Module({
  providers: [
    {
      provide: DynamoDBClient,
      useFactory: dynamoDBFactory,
    },
    {
      provide: DocumentClient,
      useFactory: documentFactory,
    },
  ],
  exports: [DynamoDBClient, DocumentClient],
})
export default class DynamoDBModule {}
