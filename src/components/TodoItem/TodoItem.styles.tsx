import { Box, Checkbox, Typography, styled, TextField, IconButton } from '@mui/material';

export const StyledTodoItemBox = styled(Box)<{ completed: boolean; isToggling?: boolean }>(
  ({ completed, isToggling }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '12px',
    backgroundColor: completed ? '#e8f5e9' : '#fff9c4',
    borderRadius: '4px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.15)',
    transform: `rotate(${Math.random() * 2 - 1}deg)`,
    transition: 'all 0.2s ease',
    cursor: isToggling ? 'wait' : 'pointer',
    '&:hover': {
      transform: 'rotate(0deg) scale(1.02)',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
    },
  })
);

export const StyledCheckbox = styled(Checkbox)<{ completed: boolean }>(
  ({ completed }) => ({
    color: completed ? '#4caf50' : '#fbc02d',
    '&.Mui-checked': {
      color: '#4caf50',
    },
  })
);

export const StyledItemText = styled(Typography)<{ completed: boolean }>(
  ({ completed }) => ({
    flex: 1,
    fontSize: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: completed ? '#388e3c' : '#5d4037',
    textDecoration: completed ? 'line-through' : 'none',
    wordBreak: 'break-word',
  })
);

export const EditItemBox = styled(Box)<{ completed: boolean }>(
  ({ completed }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    marginBottom: '12px',
    backgroundColor: completed ? '#e8f5e9' : '#fff9c4',
    borderRadius: '4px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
  })
);

export const EditItemTextField = styled(TextField)({
  flex: 1,
  '& .MuiInputBase-input': {
    fontSize: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#5d4037',
    padding: '4px 8px',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(93, 64, 55, 0.3)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'rgba(93, 64, 55, 0.5)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#5d4037',
  },
});

export const ItemEditIconButton = styled(IconButton)({
  padding: '4px',
  color: '#5d4037',
  '&:hover': {
    backgroundColor: 'rgba(93, 64, 55, 0.1)',
  },
});

export const ItemSaveIconButton = styled(IconButton)({
  padding: '4px',
  color: '#388e3c',
  '&:hover': {
    backgroundColor: 'rgba(56, 142, 60, 0.1)',
  },
});

export const ItemCancelIconButton = styled(IconButton)({
  padding: '4px',
  color: '#d32f2f',
  '&:hover': {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
  },
});

export const ItemDeleteIconButton = styled(IconButton)({
  padding: '4px',
  color: '#5d4037',
  '&:hover': {
    backgroundColor: 'rgba(93, 64, 55, 0.1)',
  },
});
