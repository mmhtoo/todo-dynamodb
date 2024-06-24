type TodoPriority = 'low' | 'medium' | 'high';

export class CreateTodoDto {
  name: string;
  hasCompleted: boolean = false;
  priority: TodoPriority = 'low';
}
