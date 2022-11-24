import React from 'react'; // import react
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import SurveyReport from './components/SurveyReport';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <div className="content">
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/create" element={<Create/>} />
              <Route path="/surveys/:id" element={<SurveyReport/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App