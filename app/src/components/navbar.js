import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom"
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function Navbar() {
    return (
        <Router>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to='/' class="nav-item nav-link active">Home <span class="sr-only">(current)</span></Link>
                        <Link to='/login' class="nav-item nav-link">Login</Link>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}>
                    <Login />
                </Route>
            </Routes>
        </Router>
    );
}

