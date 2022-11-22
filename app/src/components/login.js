import React from "react";

const Login = () => {
    return (
        <div style={{margin: "auto", width: "25%"}}>
            <h1>Login</h1>
            <form action="">
                <label htmlFor="username">Username: </label>
                <input type="text" defaultValue=""/><br /><br />
                <label htmlFor="password">Password: </label>
                <input type="password" defaultValue=""/><br /><br />
            </form>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <button style={{width: "50%"}}>Login</button>
                <button style={{width: "50%"}}>Register</button>
            </div>
        </div>
    );
};

export default Login;