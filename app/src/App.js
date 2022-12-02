import React, { useState, useMemo } from 'react'; // import react
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import SurveyReport from './components/SurveyReport';
import Navbar from "./components/Navbar";
import { UserContext } from './components/UserContext';
import Invitations from './pages/InvitedSurveys';

function App() {
  const [user, setUser] = useState([]);
  const user_framework = useMemo(() => ({ user, setUser }), [user, setUser]);

  return(
    <UserContext.Provider value={user_framework}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/create" element={<Create/>} />
              <Route exact path="/invitations" element={<Invitations/>} />
              <Route path="/surveys/:id" element={<SurveyReport/>} />
          </Routes>
          
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;