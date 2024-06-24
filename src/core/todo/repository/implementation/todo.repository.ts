import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import ITodoRepository, {
  SaveTodoParam,
  SaveTodoResult,
  TodoResult,
  UpdateTodoParam,
} from '../todo.repository.interface';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TODO_TABLE } from 'src/infra/dynamodb/constant';
import { v4 as uuid } from 'uuid';

@Injectable()
export default class TodoRepository implements ITodoRepository {
  private readonly logger = new Logger(TodoRepository.name);

  constructor(private readonly documentClient: DocumentClient) {}

  async save(param: SaveTodoParam): Promise<SaveTodoResult> {
    try {
      this.logger.log(
        'Started executing save() with param ',
        JSON.stringify(param, null, 2),
      );
      const id = uuid();
      const createdAt = new Date().toUTCString();
      await this.documentClient
        .put({
          TableName: TODO_TABLE,
          Item: {
            Id: id,
            createdAt,
            name: param.name,
            hasCompleted: param.hasCompleted,
            priority: param.priority,
          },
          ReturnValues: 'ALL_OLD',
        })
        .promise();
      return {
        id,
        createdAt,
        name: param.name,
        hasCompleted: param.hasCompleted,
        priority: param.priority,
      };
    } catch (e) {
      this.logger.error('Failed executing save() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing save()');
    }
  }

  async findById(id: string): Promise<TodoResult | null> {
    try {
      this.logger.log('Started executing findById() with param ', id);
      const result = await this.documentClient
        .get({
          TableName: TODO_TABLE,
          Key: {
            Id: id,
          },
        })
        .promise();
      return (result.Item as TodoResult) || null;
    } catch (e) {
      this.logger.error('Failed executing findById() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing findById() ');
    }
  }

  async update(param: UpdateTodoParam): Promise<TodoResult> {
    try {
      this.logger.log(
        'Started executing update() with param ',
        JSON.stringify(param, null, 2),
      );
      const savedTodo = await this.findById(param.id);
      if (!savedTodo) {
        throw new NotFoundException();
      }
      await this.documentClient
        .update({
          TableName: TODO_TABLE,
          Key: {
            Id: param.id,
          },
          UpdateExpression:
            'set #name = :name, #hasCompleted = :hasCompleted, #priority = :priority',
          ExpressionAttributeNames: {
            '#name': 'name',
            '#hasCompleted': 'hasCompleted',
            '#priority': 'priority',
          },
          ExpressionAttributeValues: {
            ':name': param.name || savedTodo.name,
            ':hasCompleted': param.hasCompleted
              ? param.hasCompleted
              : savedTodo.hasCompleted,
            ':priority': param.priority || savedTodo.priority,
          },
        })
        .promise();
      return null;
    } catch (e) {
      this.logger.error('Failed executing update() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing update() ');
    }
  }

  async findAll(): Promise<TodoResult[]> {
    try {
      this.logger.log('Started executing findAll() with param ');
      const result = await this.documentClient
        .scan({
          TableName: TODO_TABLE,
        })
        .promise();
      return (result.Items || []) as TodoResult[];
    } catch (e) {
      this.logger.error('Failed executing findAll() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing findAll() ');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      this.logger.log('Started executing findAll() with param ', id);
      await this.documentClient
        .delete({
          TableName: TODO_TABLE,
          Key: {
            Id: id,
          },
        })
        .promise();
      return;
    } catch (e) {
      this.logger.error('Failed executing findAll() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing findAll() ');
    }
  }
}
