import { Box, Checkbox, Typography, styled } from '@mui/material';

export const StyledTodoItemBox = styled(Box)<{ completed: boolean }>(
  ({ completed }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '12px',
    backgroundColor: completed ? '#e8f5e9' : '#fff9c4',
    borderRadius: '4px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.15)',
    transform: `rotate(${Math.random() * 2 - 1}deg)`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
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

