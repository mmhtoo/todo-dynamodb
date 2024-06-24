import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import TodoService from '../service/todo.service';
import { CreateTodoDto } from '../dto';

@Controller({
  version: '1',
  path: 'todos',
})
export default class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createNewTodo(@Body() dto: CreateTodoDto) {
    try {
      const result = await this.todoService.createNewTodo({
        name: dto.name,
        priority: dto.priority || 'low',
        hasCompleted: dto.hasCompleted,
      });
      return result;
    } catch (e) {
      this.logger.error('Failed executing createNewTodo() ', e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Unknown Error!');
    } finally {
      this.logger.log('Finished executing createNewTodo() ');
    }
  }

  @Get()
  async getAllTodos() {
    try {
      this.logger.log('Started executing getAllTodos() ');
      const result = await this.todoService.getAllTodos();
      return result;
    } catch (e) {
      this.logger.error('Failed executing geAllTodos() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing getAllTodos() ');
    }
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string) {
    try {
      this.logger.log('Started executing getTodoById() with param ');
      const result = await this.todoService.getTodoById(id);
      return result;
    } catch (e) {
      this.logger.error('Failed executing getTodoById() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing getTodoById() ');
    }
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    try {
      this.logger.log('Started executing deleteById() with param ');
      const result = await this.todoService.deleteById(id);
      return result;
    } catch (e) {
      this.logger.error('Failed executing deleteById() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing deleteById() ');
    }
  }

  @Put('/:id')
  async updateTodo(@Param('id') id: string, @Body() dto: CreateTodoDto) {
    try {
      this.logger.log(
        'Started executing updateTodo() with param ',
        JSON.stringify(dto, null, 2),
      );
      const result = await this.todoService.updateTodo({
        ...dto,
        id,
      });
      return result;
    } catch (e) {
      this.logger.error('Failed executing updateTodo() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing updateTodo() ');
    }
  }
}
