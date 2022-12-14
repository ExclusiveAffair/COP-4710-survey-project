import { useState, useContext } from "react";
import DatePicker from 'react-date-picker'
import '../StyleSheet/Create.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../components/UserContext';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const {email, password, published_surveys, invited_surveys} = user;

        var participantsArray = participants.split(",");
        participantsArray = participantsArray.map(participant => {
            return participant.trim();
        });

        const startDateString = startDate.toUTCString();
        const endDateString = endDate.toUTCString();
        const questionString = JSON.stringify(questions);
        const responseString = JSON.stringify([]);
        const participantsString = JSON.stringify(participantsArray);

        var survey = { 
            title: title,
            description: description,
            participants: participantsString,
            startDate: startDateString,
            endDate: endDateString,
            questions: questionString,
            responses: responseString
        };

        // add survey to survey database.
        const surveyID = await axios.post('http://localhost:8888/phpreact/insertSurveys.php', survey).then((response) => response.data.id);
        survey = {
            id: surveyID,
            ...survey
        };

        axios.get(`http://localhost:8888/phpreact/insert.php/${email}`)
        .then((response) => {
            const published_surveyIDs = JSON.parse(response.data.published_surveys);
            published_surveyIDs.push(surveyID);

            setUser(user => ({
                ...user,
                published_surveys: JSON.stringify([
                    ...JSON.parse(published_surveys),
                    survey
                ])
            }));
            const senddata = {
                email: email,
                published_surveys: JSON.stringify(published_surveyIDs)
            }
            axios.put(`http://localhost:8888/phpreact/insert.php/${email}/editPublished`, senddata);
        });

        // send the survey to the list of invitees.
        participantsArray.forEach((participant) => {
            axios.get(`http://localhost:8888/phpreact/insert.php/${participant}`)
            .then((response) => {
                // this user exists. invite them to take the survey
                if (response.data !== 'nothing found') {
                    const invited_surveyIDs = JSON.parse(response.data.invited_surveys);
                    invited_surveyIDs.push(surveyID);
                    const senddata = {
                        email: participant,
                        invited_surveys: JSON.stringify(invited_surveyIDs)
                    }
                    return axios.put(`http://localhost:8888/phpreact/insert.php/${participant}/editInvited`, senddata);
                }
            });
        });

        navigate('/home');
    };
    const addQuestion = () => {
        setQuestions(questions => [...questions, {
            id: questions.length,
            type: "likert",
            contents: ""
        }]);
    };
    const updateQuestionType = (questionID, newValue) => {
        setQuestions(questions =>
            questions.map(question => {
                if (question.id === questionID) {
                    return {...question, id: question.id, type: newValue, contents: question.contents};
                }
                return question;
            }),
        );
    };
    const updateQuestionContents = (questionID, newValue) => {
        setQuestions(questions =>
            questions.map(question => {
                if (question.id === questionID) {
                    return {...question, id: question.id, type: question.type, contents: newValue};
                }
                return question;
            }),
        );
    };
    return (
        <div className="create">
            <h1 className='title'>New Survey</h1>
            <p className='subHeading'>Please provide the information requested below.</p>
            <form onSubmit={ handleSubmit }>
                <label>Survey title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Survey description:</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Survey participants (comma-separated):</label>
                <textarea
                    required
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                />
                <label>Survey start date:</label>
                <DatePicker 
                    value={ startDate }
                    onChange={(date) => setStartDate(date)}
                />
                <label>Survey end date:</label>
                <DatePicker 
                    value={ endDate }
                    onChange={(date) => setEndDate(date)}
                />
                <div className="question-form-list">
                    {questions.map(question => (
                    <div className="question-fill" key={question.id} >
                        <label>Question type:</label>
                        <select
                            value={question.type}
                            onChange={(e) => updateQuestionType(question.id, e.target.value)}>
                            <option value="likert">Likert scale</option>
                            <option value="shortanswer"> Short answer</option>
                        </select>
                        <label>Question contents:</label>
                        <textarea
                            required
                            value={question.contents}
                            onChange={(e) => updateQuestionContents(question.id, e.target.value)}
                        />
                    </div>
                    ))}
                </div>
                <br />
                <span>
                    <button onClick={addQuestion}>Add question</button>
                    { questions.length > 0 && <button onClick={handleSubmit}>Create survey</button> }
                </span>
            </form>
        </div>
    );
}

export default Create;