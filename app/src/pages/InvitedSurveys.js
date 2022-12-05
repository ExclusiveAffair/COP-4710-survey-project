import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import '../StyleSheet/InvitedSurveys.css'
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import EditIcon from '@mui/icons-material/Edit';

export default function InvitedSurveys() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const takeSurvey = (surveyID) => {
        navigate(`/takesurvey/${surveyID}`);
    };
    const SurveyContainer = () => {
        if (user !== null) {
            const {email, password, published_surveys, invited_surveys} = user;
            return(
                <>
                    {JSON.parse(invited_surveys).map((survey) =>(
                        <div className='containers'>
                            <div className='surveys'>
                                <div className='surveyName'>
                                    <p key={survey.title} className='survey'>{survey.title}</p> 
                                </div>
                                <div className='takesurvey'>
                                    <EditIcon onClick={() => takeSurvey(survey.id)}/>
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
            <h1 className='title'>Invited Surveys</h1>
            <p className='subHeading'>Surveys you have been invited to take will show up here.</p>
            <SurveyContainer/>
        </Container>
    )
}