import { useState, useEffect } from "react";
import { TodoList } from "../types/todo";
import { getTodoLists, getTodoItemsByListId } from "../services/todoService";

interface UseTodoListsReturn {
  todoLists: TodoList[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch todo lists and their items from the API
 */
export const useTodoLists = (): UseTodoListsReturn => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodoLists = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, fetch all todo lists
      const lists = await getTodoLists();

      // Then, fetch items for each list in parallel
      const listsWithItems = await Promise.all(
        lists.map(async (list) => {
          const items = await getTodoItemsByListId(list.id);
          console.log(list.id, items);
          return {
            ...list,
            items,
          };
        })
      );
      console.log(listsWithItems);
      setTodoLists(listsWithItems);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch todo lists")
      );
      console.error("Error fetching todo lists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return {
    todoLists,
    loading,
    error,
    refetch: fetchTodoLists,
  };
};
