import axios from 'axios';
import React, {useState} from "react";
import Container from 'react-bootstrap/Container'
import "../StyleSheet/Login.css"
import Form from 'react-bootstrap/Form'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO: fill in this method
    const handleLogin = () => {

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
                            ref={(c)=> setEmail(c)}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={(c) => setPassword(c)}
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