import { apiClient } from "./axios";
import { API_CONFIG } from "../config/api";
import { TodoList, TodoItem } from "../types/todo";

/**
 * Fetches all todo lists (without items - items must be fetched separately)
 */
export const getTodoLists = async (): Promise<TodoList[]> => {
  const response = await apiClient.get<TodoList[]>(
    API_CONFIG.endpoints.todoLists
  );
  return response.data;
};

/**
 * Fetches all todo items for a specific todo list
 */
export const getTodoItemsByListId = async (
  todoListId: number
): Promise<TodoItem[]> => {
  const response = await apiClient.get<TodoItem[]>(
    `${API_CONFIG.endpoints.todoItems}/list/${todoListId}`
  );
  return response.data;
};
