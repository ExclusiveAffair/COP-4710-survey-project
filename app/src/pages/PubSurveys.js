import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@mui/icons-material/Close';
import '../StyleSheet/PubSurveys.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';

const MAX_TITLE_LEN = 30;
export default function PublishedSurveys() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const displaySurveyReport = (surveyID) => {
        navigate(`/surveyreport/${surveyID}`);
    };

    const shortFormat = (str) => {
        if (str.length > MAX_TITLE_LEN) return str.slice(0, MAX_TITLE_LEN) + "...";
        return str;
    };

    const SurveyContainer = () => {
        if (user !== null) {
            const {email, password, published_surveys, invited_surveys} = user;
            return(
                <>
                    {JSON.parse(published_surveys).map((survey) =>(
                        <div className='containers'>
                            <div className='surveys'>
                                <div className='surveyName'>
                                    <p key={survey.title} className='survey'>{shortFormat(survey.title)}</p> 
                                </div>
                                <div className='surveybuttons'>
                                    <div className='surveyreport'>
                                        <ContentPasteSearchOutlinedIcon onClick={() => displaySurveyReport(survey.id)} />
                                    </div>
                                    <div className='deletesurvey'>
                                        <CloseIcon />
                                    </div>
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