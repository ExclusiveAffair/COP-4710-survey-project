import { useState } from "react";
import DatePicker from 'react-date-picker'

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [questions, setQuestions] = useState([]);

    // TODO: do something with this survey data we have received.
    const handleSubmit = (e) => {
        e.preventDefault();
        const survey = { title, description, participants, startDate, endDate, questions };
    };
    const addQuestion = () => {
        setQuestions(questions => [...questions, {
            id: questions.length,
            type: "likert",
            contents: ""
        }]);
        console.log(questions);
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
        console.log(questions);
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
        console.log(questions);
    };
    return (
        <div className="create">
            <h2> Create a new survey </h2>
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
                <br />
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
                <button onClick={addQuestion}>Add question</button>
                { questions.length > 0 && <button onClick={handleSubmit}>Create survey</button> }
            </form>
        </div>
    );
}

export default Create;