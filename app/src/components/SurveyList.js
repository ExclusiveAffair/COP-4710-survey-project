import { Link } from "react-router-dom";

const SurveyList = ({ surveys, handleDelete }) => {
    return (
      <div className="survey-list">
        {surveys.map(survey => (
          <div className="survey-preview" key={survey.id} >
            <h2>{ survey.title }</h2>
            <p> { survey.description }</p>
            <div class="flex-container">
              <button className="btn" onClick={() => handleDelete(survey.id)}>delete survey</button>
              <button className="btn"><Link style={{textDecoration: "none", color: "inherit"}} to={`/surveys/${survey.id}`}>survey report</Link></button>
            </div>
          </div>
        ))}
      </div>
    );
  }
   
  export default SurveyList;