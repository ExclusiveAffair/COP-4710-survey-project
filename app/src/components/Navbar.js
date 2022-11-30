import React from "react";
import {Link} from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/' className="nav-item nav-link">Home<span className="sr-only">(current)</span></Link>
                        <Link to='/login' className="nav-item nav-link">Login</Link>
                        <Link to='/create' className="nav-item nav-link">Create</Link>
                    </div>
                </div>
        </nav>
    );
}