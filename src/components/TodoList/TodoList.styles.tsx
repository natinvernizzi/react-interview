import { Box, Typography, Paper, Divider, styled, TextField, IconButton, Button } from '@mui/material';

export const StyledPaper = styled(Paper)({
  backgroundColor: '#fff59d',
  borderRadius: '4px',
  padding: '20px',
  maxWidth: '400px',
  width: '100%',
  transform: 'rotate(-0.5deg)',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '350px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
});

export const StyledTitle = styled(Typography)({
  fontFamily: '"Permanent Marker", "Comic Sans MS", cursive',
  color: '#5d4037',
  textAlign: 'left',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  fontSize: '1.5rem',
});

export const StyledDivider = styled(Divider)({
  marginBottom: '16px',
  borderColor: 'rgba(93, 64, 55, 0.2)',
  borderWidth: '1px',
});

export const ItemsContainer = styled(Box)({
  minHeight: '150px',
});

export const EmptyMessage = styled(Typography)({
  textAlign: 'center',
  color: '#8d6e63',
  fontSize: '16px',
  padding: '40px 20px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

export const BottomDivider = styled(Divider)({
  marginTop: 'auto',
  marginBottom: '16px',
  borderColor: 'rgba(93, 64, 55, 0.2)',
  borderWidth: '1px',
});

export const SummaryBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const SummaryText = styled(Typography)({
  fontSize: '12px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#6d4c41',
});

export const CompletedText = styled(Typography)({
  fontSize: '12px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#388e3c',
  fontWeight: 'bold',
});

export const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

export const IconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0px',
});

export const EditTextField = styled(TextField)({
  flex: 1,
  '& .MuiInputBase-input': {
    fontFamily: '"Permanent Marker", "Comic Sans MS", cursive',
    color: '#5d4037',
    fontSize: '1.5rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
});

export const EditIconButton = styled(IconButton)({
  color: '#5d4037',
});

export const SaveIconButton = styled(IconButton)({
  color: '#388e3c',
});

export const CancelIconButton = styled(IconButton)({
  color: '#d32f2f',
});

export const DeleteIconButton = styled(IconButton)({
  color: '#5d4037',
});

export const AddItemBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  marginTop: '12px',
  backgroundColor: 'rgba(255, 249, 196, 0.5)',
  borderRadius: '4px',
  border: '2px dashed rgba(93, 64, 55, 0.3)',
});

export const AddItemTextField = styled(TextField)({
  flex: 1,
  '& .MuiInputBase-input': {
    fontSize: '14px',
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

export const AddItemButton = styled(IconButton)({
  color: '#388e3c',
  '&:hover': {
    backgroundColor: 'rgba(56, 142, 60, 0.1)',
  },
});

export const ShowMoreButton = styled(Button)({
  width: '100%',
  marginTop: '12px',
  color: '#5d4037',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '14px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(93, 64, 55, 0.1)',
  },
});
