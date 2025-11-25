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
  onItemUpdate: (itemId: number, todoListId: number, updates: Partial<{ completed: boolean }>) => void;
}

export function TodoList({ todoList, onItemUpdate }: TodoListProps) {
  const items = todoList.items ?? [];
  const completedCount = items.filter((item) => item.completed).length;
  
  return (
    <StyledPaper elevation={8}>
      <StyledTitle variant="h4">
        {todoList.name}
      </StyledTitle>

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