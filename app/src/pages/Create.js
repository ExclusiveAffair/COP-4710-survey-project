const Create = () => {
    return (
        // TODO: fill in create form
        <div className="create">
            <h2> Create a new survey </h2>
            <form>
                <label>Survey title:</label>
                <input 
                    type="text"
                    required
                />
                <label>Survey description:</label>
                <textarea 
                    required
                />
                <label>Survey type:</label>
                <select>
                    <option value="likert">Likert scale</option>
                    <option value="shortanswer"> Short answer</option>
                </select>
                <button>Create Survey</button>
            </form>
        </div>
    );
}

export default Create;