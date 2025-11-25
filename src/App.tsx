import logo from './assets/logo.png'

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <img 
        src={logo} 
        alt="Logo" 
        style={{ 
          maxWidth: '300px', 
          width: '100%', 
          height: 'auto' 
        }} 
      />
    </div>
  )
}

export default App