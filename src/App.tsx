import logo from './assets/logo.png'
import { TodoList } from './components/TodoList/TodoList'
import { useTodoLists } from './hooks/useTodoLists'
import {
  appContainerStyle,
  woodGrainOverlayStyle,
  logoContainerStyle,
  logoStyle,
  todoListContainerStyle,
} from './App.styles'

function App() {
  const { todoLists, loading, error } = useTodoLists();

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
        {loading && (
          <div style={{ color: '#fff', textAlign: 'center', padding: '20px' }}>
            Loading todo lists...
          </div>
        )}
        
        {error && (
          <div style={{ color: '#ff6b6b', textAlign: 'center', padding: '20px' }}>
            Error: {error.message}
          </div>
        )}
        
        {!loading && !error && todoLists.length === 0 && (
          <div style={{ color: '#fff', textAlign: 'center', padding: '20px' }}>
            No todo lists found.
          </div>
        )}
        
        {!loading && !error && todoLists.map((todoList) => (
          <TodoList key={todoList.id} todoList={todoList} />
        ))}
      </div>
    </div>
  )
}

export default App