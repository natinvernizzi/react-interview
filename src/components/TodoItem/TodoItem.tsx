import { useState } from 'react';
import { TodoItem as TodoItemType } from '../../types/todo';
import { toggleTodoItemComplete } from '../../services/todoService';
import { 
  StyledTodoItemBox, 
  StyledCheckbox, 
  StyledItemText 
} from './TodoItem.styles';

interface TodoItemProps {
  item: TodoItemType;
  todoListId: number;
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean }>) => void;
}

export function TodoItem({ item, todoListId, onItemUpdate }: TodoItemProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;

    // Optimistically update the UI
    const newCompletedState = !item.completed;
    onItemUpdate(item.id, todoListId, { completed: newCompletedState });

    try {
      setIsToggling(true);
      await toggleTodoItemComplete(item.id, todoListId);
    } catch (error) {
      console.error('Error toggling todo item:', error);
      // Revert the change on error
      onItemUpdate(item.id, todoListId, { completed: item.completed });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <StyledTodoItemBox 
      completed={item.completed}
      isToggling={isToggling}
      onClick={handleToggle}
    >
      <StyledCheckbox
        checked={item.completed}
        readOnly
        completed={item.completed}
      />
      <StyledItemText completed={item.completed}>
        {item.name}
      </StyledItemText>
    </StyledTodoItemBox>
  );
}

