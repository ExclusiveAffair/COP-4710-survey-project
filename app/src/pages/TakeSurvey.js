import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import { useParams } from "react-router-dom";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../StyleSheet/TakeSurvey.css'
import axios from 'axios';

export default function TakeSurveyForm() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const { id } = useParams();
    const [responses, setResponses] = useState(null);

    const getSurvey = () => {
        var survey;
        JSON.parse(user.invited_surveys).forEach((s) => {
            if (s.id === parseInt(id)) {
                survey = s;
            }
        });
        return survey;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // send these results to the database.

        axios.get(`http://localhost:8888/phpreact/insertSurveys.php/${id}`)
        .then((response) => {
            const existingResponses = JSON.parse(response.data.responses);
            existingResponses.push(responses);

            const senddata = {
                responses: JSON.stringify(existingResponses)
            }

            return axios.put(`http://localhost:8888/phpreact/insertSurveys.php/${id}/editResponses`, senddata);
        });
        
        navigate('/invitations');
    };

    const updateResponseValue = (e, questionID) => {
        setResponses(responses => ({
            ...responses,
            [questionID]: e.target.value
        }));
    };

    const activeSurvey = getSurvey();
    const radios = [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
    ];

    return (
        <Container fluid className='takesurveycontainer'>
            <h1 className='title'>{activeSurvey.title}</h1>
            <p className='subHeading'>Please answer the following questions.</p>
            <div className="takesurveyform">
                <form onSubmit={ handleSubmit }>
                    {JSON.parse(activeSurvey.questions).map((question) => (
                        <div className='question'>
                            <label>{question.contents}</label>
                            <br />
                            {question.type === 'likert' &&
                                <ButtonGroup className={`likertscale-${question.id}`}>
                                    {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={`${idx}-${question.id}`}
                                        id={`radio-${idx}-${question.id}`}
                                        type="radio"
                                        variant="link"
                                        name={`radio-${idx}-${question.id}`}
                                        value={radio.value}
                                        checked={responses !== null && question.id in responses && responses[question.id] === radio.value}
                                        onChange={(e) => updateResponseValue(e, question.id)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            }
                            {question.type === 'shortanswer' &&
                                <div className='shortanswer'>
                                    <textarea
                                        key={`${question.id}`}
                                        value={responses === null ? "" : responses[question.id]}
                                        onChange={(e) => updateResponseValue(e, question.id)}
                                    />
                                </div>
                            }
                        </div>
                    ))}
                    <br />
                    <span>
                        <button onClick={handleSubmit}>Complete survey</button>
                    </span>
                </form>
            </div>
        </Container>
    )
}