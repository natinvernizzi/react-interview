import logo from './assets/logo.png'
import { TodoList } from './components/TodoList'
import { TodoList as TodoListType } from './types/todo'

// Sample data for first commit
const sampleTodoList: TodoListType = {
  id: 1,
  name: 'Interview Todo List',
  items: [
    { id: 1, name: 'Complete the coding interview', completed: false },
    { id: 2, name: 'Review React components', completed: true },
    { id: 3, name: 'Build reusable components', completed: true },
    { id: 4, name: 'Add functionality to todo list', completed: false },
    { id: 5, name: 'Connect to NestJS API', completed: false },
  ],
}

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '40px 20px'
    }}>
      {/* Logo Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '40px'
      }}>
        <img 
          src={logo} 
          alt="Logo" 
          style={{ 
            maxWidth: '200px', 
            width: '100%', 
            height: 'auto' 
          }} 
        />
      </div>

      {/* Todo List Component */}
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <TodoList todoList={sampleTodoList} />
      </div>
    </div>
  )
}

export default App