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

    const taken = (surveyID) => {
        return JSON.parse(user.taken_surveys).includes(surveyID);
    }

    const dateInRange = (start, end) => {
        const enddate = new Date(end);
        const startdate = new Date(start);
        const now = new Date();

        enddate.setUTCHours(24);
        enddate.setUTCMinutes(0);
        enddate.setUTCSeconds(0);
        enddate.setUTCMilliseconds(0);

        startdate.setUTCHours(0);
        startdate.setUTCMinutes(0);
        startdate.setUTCSeconds(0);
        startdate.setUTCMilliseconds(0);

        return Date.parse(enddate) - Date.parse(now) >= 0 && Date.parse(now) - Date.parse(startdate) >= 0;
    }

    const SurveyContainer = () => {
        if (user !== null) {
            return(
                <>
                    {JSON.parse(user.invited_surveys).map((survey) =>(
                        <div className='containers'>
                            <div className='surveys'>
                                <div className='surveyName'>
                                    <p key={survey.title} className='survey'>{survey.title}</p> 
                                </div>
                                <div className='takesurvey'>
                                    {
                                        !taken(survey.id) &&
                                        dateInRange(survey.startDate, survey.endDate) &&
                                        <EditIcon onClick={() => takeSurvey(survey.id)}/>
                                    }
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