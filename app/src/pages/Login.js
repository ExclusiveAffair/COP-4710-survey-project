import React from "react";
import Navbar from "../components/Navbar";

export default function Login() {
    return (
        <div>
            <Navbar />
            <div style={{margin: "auto", width: "25%"}}>
                <h1>Login</h1>
                <form action="">
                    <label htmlFor="username">Username: </label>
                    <input type="text" defaultValue=""/><br /><br />
                    <label htmlFor="password">Password: </label>
                    <input type="password" defaultValue=""/><br /><br />
                </form>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button type="button" class="btn btn-primary" style={{width: "50%", margin: "0px 20px"}}>Login</button>
                    <button type="button" class="btn btn-primary" style={{width: "50%"}}>Register</button>
                </div>
            </div>
        </div> 
    );
};