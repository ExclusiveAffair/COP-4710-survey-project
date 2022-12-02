import axios from 'axios';
import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container'
import "../StyleSheet/Login.css"
import Form from 'react-bootstrap/Form'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';

export default function Login() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
        .then((response) => {
            console.log(response);
            if (Object.keys(response.data).length === 0) {
                // user is not in the database
                navigate('/home'); // for testing purposes only
            }
            else if (user.password !== response.data.password) {
                // user is in the database but the password is wrong
                navigate('/home'); // for testing purposes only
            }
            else {
                // user may be logged in
                navigate('/home'); // this is expected behavior

                // set existing published and invited surveys
                axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
                .then((response) => {
                    const existing_published_surveys = JSON.parse(response.data.published_surveys);
                    const existing_invited_surveys = JSON.parse(response.data.invited_surveys);
                    setUser(user => ({
                        ...user,
                        published_surveys: JSON.stringify(existing_published_surveys),
                        invited_surveys: JSON.stringify(existing_invited_surveys)
                    }));
                });
            }
        });
    }
    const handleRegister = (e) => {
        e.preventDefault();

        const senddata = {
            email: user.email,
            password: user.password,
            published_surveys: user.published_surveys,
            invited_surveys: user.invited_surveys
        };
        console.log(senddata);
        axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
        .then((response) => {
            console.log(response);
            if (Object.keys(response.data).length !== 0) {
                // user with this email already exists
                console.log("noo we already exist");
            }
            else {
                // user may be registered
                console.log("we good to register");
                axios.post('http://localhost:8888/phpreact/insert.php', senddata)
                .then((response) => {
                    console.log(response);
                });
                navigate('/home'); // this is expected behavior
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
                            onChange={(e) => {
                                setUser(user => ({
                                    ...user,
                                    email: e.target.value,
                                    published_surveys: '[]',
                                    invited_surveys: '[]'
                                }));
                            }}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setUser(user => ({
                                    ...user,
                                    password: e.target.value,
                                    published_surveys: '[]',
                                    invited_surveys: '[]'
                                }));
                            }}
                        />
                    </FloatingLabel>
                    <Button
                        type="submit"
                        onClick={handleLogin}
                        style={{ marginTop: "1em" }}
                    >
                        Log in
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleRegister}
                        style={{ marginTop: "1em" }}
                    >
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
};