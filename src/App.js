import { BrowserRouter as  Router,Route, Routes, Navigate  } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Forgot from './Pages/Forgot';
import Register from './Pages/Register';
import Reset from './Pages/Reset';
import Error from './Pages/Error';
import Dashboard from './Pages/Dashboard';


function App() {

  
  return (
    <div className="App">
        
    <Router>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/dash" element={<Dashboard  />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router> 
    
    </div>
  );
}

export default App;
