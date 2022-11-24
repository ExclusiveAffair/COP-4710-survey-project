const SurveyList = ({ surveys, handleDelete }) => {
    return (
      <div className="survey-list">
        {surveys.map(survey => (
          <div className="survey-preview" key={survey.id} >
            <h2>{ survey.title }</h2>
            <p> { survey.description }</p>
            <button className="btn" onClick={() => handleDelete(survey.id)}>delete survey</button>
          </div>
        ))}
      </div>
    );
  }
   
  export default SurveyList;