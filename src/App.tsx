import logo from './assets/logo.png'
import { TodoList } from './components/TodoList/TodoList'
import { TodoList as TodoListType } from './types/todo'
import {
  appContainerStyle,
  woodGrainOverlayStyle,
  logoContainerStyle,
  logoStyle,
  todoListContainerStyle,
} from './App.styles'

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
    <div style={appContainerStyle}>
      <div style={woodGrainOverlayStyle} />
      
      <div style={logoContainerStyle}>
        <img 
          src={logo} 
          alt="Logo" 
          style={logoStyle} 
        />
      </div>

      <div style={todoListContainerStyle}>
        <TodoList todoList={sampleTodoList} />
      </div>
    </div>
  )
}

export default App