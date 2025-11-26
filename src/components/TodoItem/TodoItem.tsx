import { useState } from 'react';
import { TodoItem as TodoItemType } from '../../types/todo';
import { toggleTodoItemComplete, updateTodoItem, deleteTodoItem } from '../../services/todoService';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  StyledTodoItemBox, 
  StyledCheckbox, 
  StyledItemText,
  EditItemBox,
  EditItemTextField,
  ItemEditIconButton,
  ItemSaveIconButton,
  ItemCancelIconButton,
  ItemDeleteIconButton,
} from './TodoItem.styles';

interface TodoItemProps {
  item: TodoItemType;
  todoListId: number;
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean; name: string }>) => void;
  onItemDelete: (itemId: number, todoListId: number) => void;
}

export function TodoItem({ item, todoListId, onItemUpdate, onItemDelete }: TodoItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      // Optimistic delete
      onItemDelete(item.id, todoListId);
      setDeleteDialogOpen(false);
      
      // Call API
      await deleteTodoItem(item.id);
    } catch (error) {
      console.error('Error deleting todo item:', error);
      // Note: In a production app, you'd want to refetch or revert the optimistic delete
    } finally {
      setIsDeleting(false);
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
    <>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Todo Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{item.name}"? This action cannot be undone.
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
        <ItemDeleteIconButton
          onClick={handleDeleteClick}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </ItemDeleteIconButton>
      </StyledTodoItemBox>
    </>
  );
}

