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

/**
 * Toggles the completed status of a todo item
 */
export const toggleTodoItemComplete = async (
  itemId: number,
  todoListId: number
): Promise<TodoItem> => {
  const response = await apiClient.patch<TodoItem>(
    `${API_CONFIG.endpoints.todoItems}/${itemId}/${todoListId}/toggle`
  );
  return response.data;
};

/**
 * Updates a todo list name
 */
export const updateTodoList = async (
  todoListId: number,
  name: string
): Promise<TodoList> => {
  const response = await apiClient.put<TodoList>(
    `${API_CONFIG.endpoints.todoLists}/${todoListId}`,
    { name }
  );
  return response.data;
};

/**
 * Updates a todo item
 */
export const updateTodoItem = async (
  itemId: number,
  updates: { name?: string; completed?: boolean }
): Promise<TodoItem> => {
  const response = await apiClient.put<TodoItem>(
    `${API_CONFIG.endpoints.todoItems}/${itemId}`,
    updates
  );
  return response.data;
};
