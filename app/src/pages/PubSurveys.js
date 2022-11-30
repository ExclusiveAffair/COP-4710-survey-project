import React from 'react'
import Container from 'react-bootstrap/Container'
import surveyInfo from '../surveyInfo/info.json'
import Button from 'react-bootstrap/Button'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';
import '../StyleSheet/PubSurveys.css'

export default function PublishedSurveys(){

    let SurveyContainer = () =>{
        var surveyArray = surveyInfo["Surveys"]

        console.log(surveyArray)

        return(
            <>
                {surveyArray.map((survey) =>(
                    <div className='contianers'>
                        <div className='surveys'>
                            <div className='surveyName'>
                                <p key={survey.key} className='survey'>{survey.name}</p> 
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

    return(
        <Container fluid className='containers'>
            <h1 className='title'>Published Surveys</h1>
            <p className='subHeading'>Surveys you have created will show up here.</p>
            <SurveyContainer/>
            <div className='newSurvey'>
                <Button>New Survey</Button>
            </div>
        </Container>
    )
}