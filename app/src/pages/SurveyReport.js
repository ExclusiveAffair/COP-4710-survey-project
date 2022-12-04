import { useParams } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container'
import '../StyleSheet/SurveyReport.css'

const SurveyReport = () => {
    const {user, setUser} = useContext(UserContext);
    const { id } = useParams();

    const getSurvey = () => {
        var survey;
        JSON.parse(user.published_surveys).forEach((s) => {
            if (s.id === parseInt(id)) {
                survey = s;
            }
        });
        return survey;
    }
    const activeSurvey = getSurvey();
    const responseData = JSON.parse(activeSurvey.responses);
    const respondents = responseData.length;
    const surveyStartDate = new Date(activeSurvey.startDate);
    const surveyEndDate = new Date(activeSurvey.endDate);

    const getMean = (questionID) => {
        if (respondents == 0) return "N/A";
        var sum = 0;
        responseData.forEach((response) => {
            sum += parseInt(response[questionID]);
        });
        return (sum  * 1.0 / respondents).toFixed(2);
    };

    const getVariance = (questionID) => {
        if (respondents == 0) return "N/A";
        var sum = 0;
        const mean = getMean(questionID);
        responseData.forEach((response) => {
            const dif = parseInt(response[questionID]) - mean;
            sum += dif * dif;
        });
        return (sum  * 1.0 / respondents).toFixed(2);
    }
    return (
        <Container fluid className='surveyreportcontainer'>
            <div className='reportHeader'>
                <h2 className='title'>{activeSurvey.title}</h2>
                <p className='subHeading'><b>{activeSurvey.description}</b></p>
                <p className='subHeading'><i>{surveyStartDate.toDateString()} - {surveyEndDate.toDateString()}</i></p>
                <p className='subHeading'>You have received {respondents} responses. Here's a breakdown by question:</p>
            </div>
            <div className="showsurveyreport">
                {JSON.parse(activeSurvey.questions).map((question) => (
                    <div className='questionreport'>
                        <p className='questionnumber'><b>Question {question.id + 1}. {question.contents}</b></p>
                        {question.type === 'likert' &&
                            <div className='likert'>
                                <p className='questiontype'>Format: Likert scale</p>
                                <p className='mean'>Mean of response values: {getMean(question.id)}</p>
                                <p className='variance'>Variance of response values: {getVariance(question.id)}</p>
                            </div>
                        }
                        {question.type === 'shortanswer' &&
                            <div className='likert'>
                                <p className='questiontype'>Format: Short answer</p>
                                <div className='responselist'>
                                    {responseData.map((response, rid) => (
                                        <div className='responses'>
                                            <p>Response {rid + 1}: {response[question.id]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        <br />
                    </div>
                ))}
            </div>
        </Container>
    )
}
 
export default SurveyReport;