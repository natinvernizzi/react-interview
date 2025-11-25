import logo from './assets/logo.png'
import { TodoList } from './components/TodoList/TodoList'
import { useTodoLists } from './hooks/useTodoLists'
import {
  appContainerStyle,
  woodGrainOverlayStyle,
  logoContainerStyle,
  logoStyle,
  todoListContainerStyle,
  messageStyle,
  errorMessageStyle,
} from './App.styles'

function App() {
  const { todoLists, loading, error, updateItemLocally, updateListLocally } = useTodoLists();

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
          <div style={messageStyle}>
            Loading todo lists...
          </div>
        )}
        
        {error && (
          <div style={errorMessageStyle}>
            Error: {error.message}
          </div>
        )}
        
        {!loading && !error && todoLists.length === 0 && (
          <div style={messageStyle}>
            No todo lists found.
          </div>
        )}
        
        {!loading && !error && todoLists.map((todoList) => (
          <TodoList 
            key={todoList.id} 
            todoList={todoList} 
            onItemUpdate={updateItemLocally}
            onListUpdate={updateListLocally}
          />
        ))}
      </div>
    </div>
  )
}

export default App