import { Link } from "react-router-dom";

const SurveyList = ({ surveys, handleDelete }) => {
    return (
      <div className="survey-list">
        {surveys.map(survey => (
          <div className="survey-preview" key={survey.id} >
            <Link to={`/surveys/${survey.id}`}>
                <h2>{ survey.title }</h2>
                <p> { survey.description }</p>
            </Link>
            <button className="btn" onClick={() => handleDelete(survey.id)}>delete survey</button>
          </div>
        ))}
      </div>
    );
  }
   
  export default SurveyList;