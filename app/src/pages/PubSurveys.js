import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@mui/icons-material/Close';
import '../StyleSheet/PubSurveys.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import axios from 'axios';

const MAX_TITLE_LEN = 30;
export default function PublishedSurveys() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const displaySurveyReport = (surveyID) => {
        navigate(`/surveyreport/${surveyID}`);
    };

    const getParticipantPromises = (participants) => {
        const promises = [];
        participants.forEach((participant) => {
            promises.push(axios.get(`http://localhost:8888/phpreact/insert.php/${participant}`));
        });
        return Promise.all(promises);
    }

    const deleteSurvey = (surveyID) => {
        // first, remove this survey from the creator's publish list
        axios.get(`http://localhost:8888/phpreact/insert.php/${user.email}`)
        .then((response) => {
            var published_surveyIDs = JSON.parse(response.data.published_surveys);
            published_surveyIDs = published_surveyIDs.filter((id) => (
                id !== surveyID
            ));

            setUser(user => ({
                ...user,
                published_surveys: JSON.stringify(
                    JSON.parse(user.published_surveys).filter((survey) => (
                        survey.id !== surveyID
                    ))
                )
            }));
            const senddata = {
                email: user.email,
                published_surveys: JSON.stringify(published_surveyIDs)
            }
            axios.put(`http://localhost:8888/phpreact/insert.php/${user.email}/editPublished`, senddata);
        });

        // then, remove this survey from each of its participants' invite lists
        axios.get(`http://localhost:8888/phpreact/insertSurveys.php/${surveyID}`)
        .then((response) => {
            return getParticipantPromises(JSON.parse(response.data.participants));
        })
        .then((responses) => {
            for (var i = 0; i < responses.length; i++) {
                const response = responses[i];
                if (response.data !== 'nothing found') {
                    var invited_surveyIDs = JSON.parse(response.data.invited_surveys);
                    invited_surveyIDs = invited_surveyIDs.filter((id) => (
                        id !== surveyID
                    ));
                    const senddata = {
                        email: response.data.email,
                        invited_surveys: JSON.stringify(invited_surveyIDs)
                    }
                    axios.put(`http://localhost:8888/phpreact/insert.php/${response.data.email}/editInvited`, senddata);
                }
            }
        });

        // then, delete the survey itself
        axios.delete(`http://localhost:8888/phpreact/insertSurveys.php/${surveyID}`);
    };

    const shortFormat = (str) => {
        if (str.length > MAX_TITLE_LEN) return str.slice(0, MAX_TITLE_LEN) + "...";
        return str;
    };

    const SurveyContainer = () => {
        if (user !== null) {
            return(
                <>
                    {JSON.parse(user.published_surveys).map((survey) =>(
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
                                        <CloseIcon onClick={() => deleteSurvey(survey.id)} />
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