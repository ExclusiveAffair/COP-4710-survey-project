import React from "react";
import {Link} from "react-router-dom"

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to='/' class="nav-item nav-link">Home<span class="sr-only">(current)</span></Link>
                        <Link to='/login' class="nav-item nav-link">Login</Link>
                    </div>
                </div>
        </nav>
    );
}