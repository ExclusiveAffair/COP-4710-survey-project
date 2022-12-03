import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';
import '../StyleSheet/PubSurveys.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import { getTableContainerUtilityClass } from '@mui/material';

export default function PublishedSurveys() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const SurveyContainer = () => {
        if (user !== null) {
            const {email, password, published_surveys, invited_surveys} = user;
            return(
                <>
                    {JSON.parse(published_surveys).map((survey) =>(
                        <div className='containers'>
                            <div className='surveys'>
                                <div className='surveyName'>
                                    <p key={survey.title} className='survey'>{survey.title}</p> 
                                </div>
                                <div className='surveyreport'>
                                    <p>View report</p>
                                    <ArrowRightAltIcon/>
                                </div>
                            </div> 
                        </div>
                    ))}
                </>
            )
        }
        else return null;
    }

    return (
        <Container fluid className='containers'>
            <h1 className='title'>Published Surveys</h1>
            <p className='subHeading'>Surveys you have created will show up here.</p>
            <SurveyContainer/>
            <div className='newSurvey'>
                <Button onClick={() => navigate('/create') }>New Survey</Button>
            </div>
        </Container>
    )
}