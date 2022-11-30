import axios from 'axios';
import React, {useState} from "react";
import Container from 'react-bootstrap/Container'
import "../StyleSheet/Login.css"
import Form from 'react-bootstrap/Form'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        console.log('checking');
        axios.get(`http://localhost:8888/phpreact/insert.php/${email}`)
        .then((response) => {
            console.log(response);
            if (Object.keys(response.data).length === 0) {
                // user is not in the database
            }
            else if (password !== response.data.password) {
                // user is in the database but the password is wrong
            }
            else {
                // user may be logged in
                navigate('/home');
            }
        });
    }
    
    return (
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">Login</h1>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                    <Button
                        type="submit"
                        onClick={handleLogin}
                        style={{ marginTop: "1em" }}
                    >
                        Log in
                    </Button>
                </Form>
            </Container>
        </div>
    );
};