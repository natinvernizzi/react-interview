import { useState, useEffect } from "react";
import { TodoList, TodoItem } from "../types/todo";
import { getTodoLists, getTodoItemsByListId } from "../services/todoService";

interface UseTodoListsReturn {
  todoLists: TodoList[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateItemLocally: (
    itemId: number,
    todoListId: number,
    updates: Partial<{ completed: boolean; name: string }>
  ) => void;
  updateListLocally: (todoListId: number, name: string) => void;
  deleteListLocally: (todoListId: number) => void;
  deleteItemLocally: (itemId: number, todoListId: number) => void;
  addItemLocally: (todoListId: number, item: TodoItem) => void;
  addListLocally: (list: TodoList) => void;
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
          // Sort items by id
          const sortedItems = [...items].sort((a, b) => a.id - b.id);
          return {
            ...list,
            items: sortedItems,
          };
        })
      );
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

  const updateItemLocally = (
    itemId: number,
    todoListId: number,
    updates: Partial<{ completed: boolean; name: string }>
  ) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === todoListId) {
          const updatedItems = list.items?.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          );
          // Keep items sorted by id
          const sortedItems = updatedItems?.sort((a, b) => a.id - b.id);
          return {
            ...list,
            items: sortedItems,
          };
        }
        return list;
      })
    );
  };

  const updateListLocally = (todoListId: number, name: string) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === todoListId ? { ...list, name } : list
      )
    );
  };

  const deleteListLocally = (todoListId: number) => {
    setTodoLists((prevLists) =>
      prevLists.filter((list) => list.id !== todoListId)
    );
  };

  const deleteItemLocally = (itemId: number, todoListId: number) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === todoListId) {
          return {
            ...list,
            items: list.items?.filter((item) => item.id !== itemId),
          };
        }
        return list;
      })
    );
  };

  const addItemLocally = (todoListId: number, item: TodoItem) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === todoListId) {
          const updatedItems = [...(list.items || []), item];
          // Keep items sorted by id
          const sortedItems = updatedItems.sort((a, b) => a.id - b.id);
          return {
            ...list,
            items: sortedItems,
          };
        }
        return list;
      })
    );
  };

  const addListLocally = (list: TodoList) => {
    setTodoLists((prevLists) => [{ ...list, items: [] }, ...prevLists]);
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return {
    todoLists,
    loading,
    error,
    refetch: fetchTodoLists,
    updateItemLocally,
    updateListLocally,
    deleteListLocally,
    deleteItemLocally,
    addItemLocally,
    addListLocally,
  };
};
