
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UsersContextProvider } from './context/userContext';
import Login from './pages/Login';
import Prompt from './pages/Prompt';
import Navbar from "./components/Navbar"
import Temp from './pages/Temp';
import Test from './pages/contexttest';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header" style={{ backgroundColor: '#282c34' }}>
          <Routes>
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/login" element={<Login />} />
            <Route path="/temp" element={<Temp />} />
            <Route 
              path="/test" 
              element={
                <UsersContextProvider>
                  <Test />
                </UsersContextProvider>
              } 
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;