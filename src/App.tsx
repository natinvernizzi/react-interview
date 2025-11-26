import { useState } from 'react'
import logo from './assets/logo.png'
import { TodoList } from './components/TodoList/TodoList'
import { useTodoLists } from './hooks/useTodoLists'
import { createTodoList } from './services/todoService'
import {
  appContainerStyle,
  woodGrainOverlayStyle,
  logoContainerStyle,
  logoStyle,
  todoListContainerStyle,
  messageStyle,
  errorMessageStyle,
  addListContainerStyle,
  addListBoxStyle,
  addListInputStyle,
  addListButtonStyle,
} from './App.styles'

function App() {
  const { todoLists, loading, error, updateItemLocally, updateListLocally, deleteListLocally, deleteItemLocally, addItemLocally, addListLocally } = useTodoLists();
  const [newListName, setNewListName] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = async () => {
    if (!newListName.trim() || newListName.trim().length < 3) {
      return;
    }

    try {
      setIsAddingList(true);
      
      // Call API
      const newList = await createTodoList(newListName.trim());
      
      // Add to local state
      addListLocally(newList);
      
      // Clear input
      setNewListName('');
    } catch (error) {
      console.error('Error adding todo list:', error);
    } finally {
      setIsAddingList(false);
    }
  };

  const handleAddListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddList();
    } else if (e.key === 'Escape') {
      setNewListName('');
    }
  };

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

      {!loading && !error && (
        <div style={addListContainerStyle}>
          <div style={addListBoxStyle}>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={handleAddListKeyDown}
              placeholder="Create a new list..."
              disabled={isAddingList}
              style={addListInputStyle}
            />
            <button
              onClick={handleAddList}
              disabled={isAddingList || newListName.trim().length < 3}
              style={{
                ...addListButtonStyle,
                opacity: isAddingList || newListName.trim().length < 3 ? 0.5 : 1,
                cursor: isAddingList || newListName.trim().length < 3 ? 'not-allowed' : 'pointer',
              }}
            >
              {isAddingList ? 'Adding...' : '+ Add List'}
            </button>
          </div>
        </div>
      )}

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
            onListDelete={deleteListLocally}
            onItemDelete={deleteItemLocally}
            onItemAdd={addItemLocally}
          />
        ))}
      </div>
    </div>
  )
}

export default App