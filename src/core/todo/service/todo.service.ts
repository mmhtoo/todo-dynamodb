import { Injectable, Logger } from '@nestjs/common';
import ITodoRepository, {
  SaveTodoParam,
  UpdateTodoParam,
} from '../repository/todo.repository.interface';

type CreateNewTodoParam = SaveTodoParam;

@Injectable()
export default class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(private readonly todoRepository: ITodoRepository) {}

  async createNewTodo(param: CreateNewTodoParam) {
    try {
      this.logger.log('Started executing createNewTodo()');
      const result = await this.todoRepository.save(param);
      return result;
    } catch (e) {
      this.logger.error('Failed executing createNewTodo() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing createNewTodo() ');
    }
  }

  async getAllTodos() {
    try {
      this.logger.log('Started executing getAllTodos() ');
      const result = await this.todoRepository.findAll();
      return result;
    } catch (e) {
      this.logger.error('Failed executing getAllTodos() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing getAllTodos() ');
    }
  }

  async getTodoById(id: string) {
    try {
      const result = await this.todoRepository.findById(id);
      return result;
    } catch (e) {
      this.logger.error('Failed executing getTodoById() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing getTodoById() ');
    }
  }

  async deleteById(id: string) {
    try {
      this.logger.log('Started executing deleteById() with param', id);
      await this.todoRepository.deleteById(id);
      return;
    } catch (e) {
      this.logger.error('Failed executing deleteById() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing deleteById() ');
    }
  }

  async updateTodo(param: UpdateTodoParam) {
    try {
      this.logger.log(
        'Started executing updateTodo() with param',
        JSON.stringify(param, null, 2),
      );
      await this.todoRepository.update(param);
      return;
    } catch (e) {
      this.logger.error('Failed executing updateTodo() ', e);
      throw e;
    } finally {
      this.logger.log('Finished executing updateTodo() ');
    }
  }
}
