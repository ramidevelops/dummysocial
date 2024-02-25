import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main-page/Main';
import { Login } from './pages/Login';
import { Navbar } from './components/navbar';
import { Createpost } from './pages/create-post/createpost';

function App() {

  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Createpost" element={<Createpost />} />
        </Routes>
        <Navbar />
      </Router>

    </div>
  );
}

export default App;
