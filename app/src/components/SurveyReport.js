import { useParams } from "react-router-dom";

const SurveyReport = () => {
    const { id } = useParams();

    // TODO: finish the survey report
    return (
        <div classname="survey-report">
            <h2>Survey Report: Survey number { id }</h2>
        </div>
    );
}
 
export default SurveyReport;