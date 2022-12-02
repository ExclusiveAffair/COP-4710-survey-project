import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import '../StyleSheet/InvitedSurveys.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';

export default function InvitedSurveys() {
    const {user, setUser} = useContext(UserContext);

    const SurveyContainer = () => {
        if (user !== null) {
            const {email, password, invited_surveys} = user;
            return(
                <>
                    {JSON.parse(invited_surveys).map((survey) =>(
                        <div className='containers'>
                            <div className='surveys'>
                                <div className='surveyName'>
                                    <p key={survey.title} className='survey'>{survey.title}</p> 
                                </div>
                                <div className='takesurvey'>
                                    <p>Take survey</p>
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
            <h1 className='title'>Invited Surveys</h1>
            <p className='subHeading'>Surveys you have been invited to take will show up here.</p>
            <SurveyContainer/>
        </Container>
    )
}