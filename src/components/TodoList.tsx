import { TodoList as TodoListType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todoList: TodoListType;
}

export function TodoList({ todoList }: TodoListProps) {
  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '2px solid #e5e7eb',
        }}
      >
        {todoList.name}
      </h2>

      {/* Todo Items */}
      <div>
        {todoList.items.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: '14px',
              padding: '20px',
            }}
          >
            No items yet
          </p>
        ) : (
          todoList.items.map((item) => <TodoItem key={item.id} item={item} />)
        )}
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#6b7280',
        }}
      >
        <span>
          Total: {todoList.items.length} item{todoList.items.length !== 1 ? 's' : ''}
        </span>
        <span>
          Completed: {todoList.items.filter((item) => item.completed).length}
        </span>
      </div>
    </div>
  );
}

