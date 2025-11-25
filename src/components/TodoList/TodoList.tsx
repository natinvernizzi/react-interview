import { useState } from 'react';
import { TodoList as TodoListType } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { updateTodoList } from '../../services/todoService';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  StyledPaper,
  StyledTitle,
  StyledDivider,
  ItemsContainer,
  EmptyMessage,
  BottomDivider,
  SummaryBox,
  SummaryText,
  CompletedText,
  TitleBox,
  EditTextField,
  EditIconButton,
  SaveIconButton,
  CancelIconButton,
} from './TodoList.styles';

interface TodoListProps {
  todoList: TodoListType;
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean }>) => void;
  onListUpdate: (todoListId: number, name: string) => void;
}

export function TodoList({ todoList, onItemUpdate, onListUpdate }: TodoListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todoList.name);
  const [isSaving, setIsSaving] = useState(false);
  
  const items = todoList.items ?? [];
  const completedCount = items.filter((item) => item.completed).length;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedName(todoList.name);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(todoList.name);
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim() || editedName === todoList.name) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      // Optimistic update
      onListUpdate(todoList.id, editedName);
      setIsEditing(false);
      
      // Call API
      await updateTodoList(todoList.id, editedName);
    } catch (error) {
      console.error('Error updating todo list:', error);
      // Revert on error
      onListUpdate(todoList.id, todoList.name);
      setEditedName(todoList.name);
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
  
  return (
    <StyledPaper elevation={8}>
      <TitleBox>
        {isEditing ? (
          <>
            <EditTextField
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              size="small"
              disabled={isSaving}
              variant="standard"
            />
            <SaveIconButton
              onClick={handleSaveEdit}
              disabled={isSaving}
              size="small"
            >
              <CheckIcon />
            </SaveIconButton>
            <CancelIconButton
              onClick={handleCancelEdit}
              disabled={isSaving}
              size="small"
            >
              <CloseIcon />
            </CancelIconButton>
          </>
        ) : (
          <>
            <StyledTitle variant="h4">
              {todoList.name}
            </StyledTitle>
            <EditIconButton
              onClick={handleEditClick}
              size="small"
            >
              <EditIcon />
            </EditIconButton>
          </>
        )}
      </TitleBox>

      <StyledDivider />

      <ItemsContainer>
        {items.length === 0 ? (
          <EmptyMessage>
            No items yet!
          </EmptyMessage>
        ) : (
          items.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              todoListId={todoList.id}
              onItemUpdate={onItemUpdate}
            />
          ))
        )}
      </ItemsContainer>

      <BottomDivider />
      
      <SummaryBox>
        <SummaryText>
          Total: {items.length} item{items.length !== 1 ? 's' : ''}
        </SummaryText>
        <CompletedText>
          ✓ Completed: {completedCount}
        </CompletedText>
      </SummaryBox>
    </StyledPaper>
  );
}