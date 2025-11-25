import { TodoItem as TodoItemType } from '../types/todo';

interface TodoItemProps {
  item: TodoItemType;
}

export function TodoItem({ item }: TodoItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        marginBottom: '8px',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <input
        type="checkbox"
        checked={item.completed}
        readOnly
        style={{
          width: '20px',
          height: '20px',
          marginRight: '12px',
          cursor: 'pointer',
          accentColor: '#3b82f6',
        }}
      />
      <span
        style={{
          flex: 1,
          fontSize: '16px',
          color: item.completed ? '#9ca3af' : '#1f2937',
          textDecoration: item.completed ? 'line-through' : 'none',
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

