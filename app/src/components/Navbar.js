import React from "react";
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
    const location = useLocation();
    if (location.pathname === '/') return null;
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/home' className="nav-item nav-link">Home<span className="sr-only">(current)</span></Link>
                        <Link to='/invitations' className="nav-item nav-link">Invitations</Link>
                    </div>
                </div>
        </nav>
    );
}