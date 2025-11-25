export interface TodoItem {
  id: number;
  name: string;
  completed: boolean;
  todoListId: number;
}

export interface TodoList {
  id: number;
  name: string;
  items?: TodoItem[];
}

