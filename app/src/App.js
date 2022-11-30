import React from 'react'; // import react
import Login from './pages/Login';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import SurveyReport from './components/SurveyReport';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/create" element={<Create/>} />
        <Route path="/surveys/:id" element={<SurveyReport/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App