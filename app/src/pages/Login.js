import React from "react";
import { useState } from "react";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO: fill in these methods
    const handleLogin = () => {

    }
    const handleRegister = () => {

    }
    return (
        <div>
            <div style={{margin: "auto", width: "25%"}}>
                <h2>Login</h2>
                <form action="">
                    <label htmlFor="emailaddress">Email address: </label>
                    <input 
                        type="text"
                        required
                        defaultValue=""
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br /><br />
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        required
                        defaultValue=""
                        onChange={(e) => setPassword(e.target.value)}/><br /><br />
                </form>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{width: "50%", margin: "0px 20px", backgroundColor: "#f1356d"}}
                        onClick={handleLogin}>Login</button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{width: "50%", backgroundColor: "#f1356d"}}
                        onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div> 
    );
};