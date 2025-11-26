import { useState } from 'react';
import { TodoList as TodoListType, TodoItem as TodoItemType } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { updateTodoList, deleteTodoList, createTodoItem } from '../../services/todoService';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
  AddItemBox,
  AddItemTextField,
  AddItemButton,
  ShowMoreButton,
} from './TodoList.styles';

interface TodoListProps {
  todoList: TodoListType;
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean; name: string }>) => void;
  onListUpdate: (todoListId: number, name: string) => void;
  onListDelete: (todoListId: number) => void;
  onItemDelete: (itemId: number, todoListId: number) => void;
  onItemAdd: (todoListId: number, item: TodoItemType) => void;
}

export function TodoList({ todoList, onItemUpdate, onListUpdate, onListDelete, onItemDelete, onItemAdd }: TodoListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todoList.name);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  const items = todoList.items ?? [];
  const completedCount = items.filter((item) => item.completed).length;
  const MAX_ITEMS_SHOWN = 5;
  const hasMoreItems = items.length > MAX_ITEMS_SHOWN;
  const displayedItems = showAll ? items : items.slice(0, MAX_ITEMS_SHOWN);

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

  const handleAddItem = async () => {
    if (!newItemName.trim() || newItemName.trim().length < 3) {
      return;
    }

    try {
      setIsAdding(true);
      
      // Call API
      const newItem = await createTodoItem(newItemName.trim(), todoList.id);
      
      // Add to local state
      onItemAdd(todoList.id, newItem);
      
      // Clear input
      setNewItemName('');
    } catch (error) {
      console.error('Error adding todo item:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    } else if (e.key === 'Escape') {
      setNewItemName('');
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
          <>
            {displayedItems.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                todoListId={todoList.id}
                onItemUpdate={onItemUpdate}
                onItemDelete={onItemDelete}
              />
            ))}
            
            {hasMoreItems && (
              <ShowMoreButton
                onClick={() => setShowAll(!showAll)}
                variant="text"
              >
                {showAll 
                  ? '▲ Show Less' 
                  : `▼ Show ${items.length - MAX_ITEMS_SHOWN} More Item${items.length - MAX_ITEMS_SHOWN !== 1 ? 's' : ''}`
                }
              </ShowMoreButton>
            )}
          </>
        )}
        
        <AddItemBox>
          <AddItemTextField
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={handleAddKeyDown}
            placeholder="Add new item..."
            disabled={isAdding}
            variant="standard"
          />
          <AddItemButton
            onClick={handleAddItem}
            disabled={isAdding || newItemName.trim().length < 3}
            size="small"
          >
            <AddIcon />
          </AddItemButton>
        </AddItemBox>
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