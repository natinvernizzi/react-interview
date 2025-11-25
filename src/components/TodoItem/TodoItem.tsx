import { useState } from 'react';
import { TodoItem as TodoItemType } from '../../types/todo';
import { toggleTodoItemComplete, updateTodoItem } from '../../services/todoService';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { 
  StyledTodoItemBox, 
  StyledCheckbox, 
  StyledItemText,
  EditItemBox,
  EditItemTextField,
  ItemEditIconButton,
  ItemSaveIconButton,
  ItemCancelIconButton,
} from './TodoItem.styles';

interface TodoItemProps {
  item: TodoItemType;
  todoListId: number;
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean; name: string }>) => void;
}

export function TodoItem({ item, todoListId, onItemUpdate }: TodoItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    if (isToggling || isEditing) return;

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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedName(item.name);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(item.name);
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim() || editedName === item.name) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      // Optimistic update
      onItemUpdate(item.id, todoListId, { name: editedName });
      setIsEditing(false);
      
      // Call API
      await updateTodoItem(item.id, { name: editedName });
    } catch (error) {
      console.error('Error updating todo item:', error);
      // Revert on error
      onItemUpdate(item.id, todoListId, { name: item.name });
      setEditedName(item.name);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <EditItemBox completed={item.completed}>
        <StyledCheckbox
          checked={item.completed}
          readOnly
          completed={item.completed}
        />
        <EditItemTextField
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={isSaving}
          variant="standard"
        />
        <ItemSaveIconButton
          onClick={handleSaveEdit}
          disabled={isSaving}
          size="small"
        >
          <CheckIcon fontSize="small" />
        </ItemSaveIconButton>
        <ItemCancelIconButton
          onClick={handleCancelEdit}
          disabled={isSaving}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </ItemCancelIconButton>
      </EditItemBox>
    );
  }

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
      <ItemEditIconButton
        onClick={handleEditClick}
        size="small"
      >
        <EditIcon fontSize="small" />
      </ItemEditIconButton>
    </StyledTodoItemBox>
  );
}

