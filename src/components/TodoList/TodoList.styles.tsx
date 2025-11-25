import { Box, Typography, Paper, Divider, styled } from '@mui/material';

export const StyledPaper = styled(Paper)({
  backgroundColor: '#fff59d',
  borderRadius: '4px',
  padding: '32px',
  maxWidth: '600px',
  width: '100%',
  transform: 'rotate(-0.5deg)',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '400px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
});

export const StyledTitle = styled(Typography)({
  fontFamily: '"Permanent Marker", "Comic Sans MS", cursive',
  color: '#5d4037',
  marginBottom: '24px',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
});

export const StyledDivider = styled(Divider)({
  marginBottom: '24px',
  borderColor: 'rgba(93, 64, 55, 0.2)',
  borderWidth: '1px',
});

export const ItemsContainer = styled(Box)({
  minHeight: '200px',
  flex: 1,
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
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#6d4c41',
});

export const CompletedText = styled(Typography)({
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#388e3c',
  fontWeight: 'bold',
});

