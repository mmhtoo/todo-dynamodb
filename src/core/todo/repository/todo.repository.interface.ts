export type SaveTodoParam = {
  name: string;
  priority: 'low' | 'medium' | 'high';
  hasCompleted: boolean;
};

export type SaveTodoResult = SaveTodoParam & {
  id: string;
  createdAt: string;
};

export type TodoResult = SaveTodoResult;

export type UpdateTodoParam = SaveTodoParam & {
  id: string;
};

export default abstract class ITodoRepository {
  abstract save(param: SaveTodoParam): Promise<SaveTodoResult>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<TodoResult | null>;
  abstract update(param: UpdateTodoParam): Promise<TodoResult>;
  abstract findAll(): Promise<TodoResult[]>;
}
