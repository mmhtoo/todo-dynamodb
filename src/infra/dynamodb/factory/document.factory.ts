import * as AWS from 'aws-sdk';

export const documentFactory = () =>
  new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-1',
  });
