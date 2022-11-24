import React from "react";
import { useState } from "react";
import SurveyList from "../components/SurveyList";

export default function Home() {
    // TODO: replace these samples with the fetched ones from the database
    const [surveys, setSurveys] = useState([
        {
            id: 1,
            title: 'Hello',
            description: 'Check-in survey',
            participants: ['e1', 'e2', 'e3'],
            startDate: new Date(2022, 11, 24, 0, 0, 0, 0),
            endDate: new Date(2022, 11, 25, 0, 0, 0, 0),
            questions: [
                {
                    type: 1,
                    contents: "How are you doing?"
                },
                {
                    type: 2,
                    contents: "Please explain your answer"
                }
            ]
        },
        {
            id: 2,
            title: 'and again',
            description: 'how excited are you for the holiday break??',
            participants: ['e4', 'e5', 'e6'],
            startDate: new Date(2022, 12, 1, 0, 0, 0, 0),
            endDate: new Date(2022, 12, 25, 0, 0, 0, 0),
            questions: [
                {
                    type: 1,
                    contents: "How excited are you?"
                },
                {
                    type: 2,
                    contents: "Please explain your answer"
                }
            ]
        }
    ]);

    const handleDelete = (id) => {
        const newSurveys = surveys.filter(survey => survey.id !== id);
        setSurveys(newSurveys);
    }

    return (
        <div>
            <h1>Homepage</h1>
            <SurveyList surveys={surveys} handleDelete={ handleDelete }/>
        </div>
    )
}