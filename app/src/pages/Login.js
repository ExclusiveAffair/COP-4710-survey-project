import axios from 'axios';
import React, { useState, useContext, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import "../StyleSheet/Login.css"
import Form from 'react-bootstrap/Form'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import Modal from 'react-bootstrap/Modal';

export default function Login() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [showLoginFailedDialog, setShowLoginFailedDialog] = useState(false);
    const [showRegistrationFailedDialog, setShowRegistrationFailedDialog] = useState(false);

    const getPromise = (surveyIDs) => {
        const promises = [];
        surveyIDs.forEach((id) => {
            promises.push(axios.get(`http://localhost:8888/phpreact/insertSurveys.php/${id}`));
        });
        return Promise.all(promises);
    }
    const handleLogin = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
        .then((response) => {
            if (response.data === 'nothing found') {
                // user is not in the database
                setShowLoginFailedDialog(true);
            }
            else if (user.password !== response.data.password) {
                // user is in the database but the password is wrong
                setShowLoginFailedDialog(true);
            }
            else {
                // user may be logged in
                navigate('/home');

                // set existing published and invited surveys
                axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
                .then((response) => {
                    const published_surveyIDs = JSON.parse(response.data.published_surveys);
                    const invited_surveyIDs = JSON.parse(response.data.invited_surveys);

                    getPromise(published_surveyIDs).then((values) => {
                        setUser(user => ({
                            ...user,
                            published_surveys: JSON.stringify(values.map((val) => (val.data)))
                        }))
                    });
                    getPromise(invited_surveyIDs).then((values) => { 
                        setUser(user => ({
                            ...user,
                            invited_surveys: JSON.stringify(values.map((val) => (val.data))),
                        }))
                    });
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
        axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
        .then((response) => {
            if (response.data !== 'nothing found') {
                // user with this email already exists
                setShowRegistrationFailedDialog(true);
            }
            else {
                // user may be registered
                axios.post('http://localhost:8888/phpreact/insert.php', senddata);
                navigate('/home');
            }
        });
    }

    const Dialog = ({ show, onClose, header, contents }) => {      
        return (
          <>
            <Modal show={show} onHide={onClose}>
              <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{contents}</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }

    return (
        <div className="parent">
            <Dialog
                show={showLoginFailedDialog}
                onClose={ () => setShowLoginFailedDialog(false) }
                header="Login failed"
                contents="Whoops! You have entered an invalid username or password."
            />
            <Dialog
                show={showRegistrationFailedDialog}
                onClose={ () => setShowRegistrationFailedDialog(false) }
                header="Registration failed"
                contents="Whoops! A user with that email address already exists."
            />
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