import { Module } from '@nestjs/common';
import TodoModule from './core/todo/todo.module';

@Module({
  imports: [TodoModule],
})
export class AppModule {}
