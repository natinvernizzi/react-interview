import { useState } from 'react';
import { TodoList as TodoListType } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { updateTodoList, deleteTodoList } from '../../services/todoService';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
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
  IconsContainer,
  EditTextField,
  EditIconButton,
  SaveIconButton,
  CancelIconButton,
  DeleteIconButton,
} from './TodoList.styles';

interface TodoListProps {
  todoList: TodoListType;
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean; name: string }>) => void;
  onListUpdate: (todoListId: number, name: string) => void;
  onListDelete: (todoListId: number) => void;
  onItemDelete: (itemId: number, todoListId: number) => void;
}

export function TodoList({ todoList, onItemUpdate, onListUpdate, onListDelete, onItemDelete }: TodoListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todoList.name);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      // Optimistic delete
      onListDelete(todoList.id);
      setDeleteDialogOpen(false);
      
      // Call API
      await deleteTodoList(todoList.id);
    } catch (error) {
      console.error('Error deleting todo list:', error);
      // Note: In a production app, you'd want to refetch or revert the optimistic delete
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Todo List?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{todoList.name}"? This will also delete all {items.length} item{items.length !== 1 ? 's' : ''} in this list. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={isDeleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    
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
            <IconsContainer>
              <EditIconButton
                onClick={handleEditClick}
                size="small"
              >
                <EditIcon />
              </EditIconButton>
              <DeleteIconButton
                onClick={handleDeleteClick}
                size="small"
              >
                <DeleteIcon />
              </DeleteIconButton>
            </IconsContainer>
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
              onItemDelete={onItemDelete}
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
    </>
  );
}