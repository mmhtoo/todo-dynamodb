import { Module } from '@nestjs/common';
import TodoController from './controller/todo.controller';
import ITodoRepository from './repository/todo.repository.interface';
import TodoRepository from './repository/implementation/todo.repository';
import DynamoDBModule from 'src/infra/dynamodb/dynamodb.module';
import TodoService from './service/todo.service';

@Module({
  imports: [DynamoDBModule],
  controllers: [TodoController],
  providers: [
    {
      provide: ITodoRepository,
      useClass: TodoRepository,
    },
    TodoService,
  ],
})
export default class TodoModule {}
