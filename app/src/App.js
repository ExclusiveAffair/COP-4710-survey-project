import React from 'react'; // import react
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <div className="content">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path ="login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App