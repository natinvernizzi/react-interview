import { TodoItem as TodoItemType } from '../../types/todo';
import { 
  StyledTodoItemBox, 
  StyledCheckbox, 
  StyledItemText 
} from './TodoItem.styles';

interface TodoItemProps {
  item: TodoItemType;
}

export function TodoItem({ item }: TodoItemProps) {
  return (
    <StyledTodoItemBox completed={item.completed}>
      <StyledCheckbox
        checked={item.completed}
        readOnly
        completed={item.completed}
      />
      <StyledItemText completed={item.completed}>
        {item.name}
      </StyledItemText>
    </StyledTodoItemBox>
  );
}

