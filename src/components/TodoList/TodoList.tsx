import { TodoList as TodoListType } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';
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
} from './TodoList.styles';

interface TodoListProps {
  todoList: TodoListType;
}

export function TodoList({ todoList }: TodoListProps) {
  const completedCount = todoList.items.filter((item) => item.completed).length;
  
  return (
    <StyledPaper elevation={8}>
      <StyledTitle variant="h4">
        {todoList.name}
      </StyledTitle>

      <StyledDivider />

      <ItemsContainer>
        {todoList.items.length === 0 ? (
          <EmptyMessage>
            No items yet!
          </EmptyMessage>
        ) : (
          todoList.items.map((item) => <TodoItem key={item.id} item={item} />)
        )}
      </ItemsContainer>

      <BottomDivider />
      
      <SummaryBox>
        <SummaryText>
          Total: {todoList.items.length} item{todoList.items.length !== 1 ? 's' : ''}
        </SummaryText>
        <CompletedText>
          ✓ Completed: {completedCount}
        </CompletedText>
      </SummaryBox>
    </StyledPaper>
  );
}

