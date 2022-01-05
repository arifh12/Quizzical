export default function Start({loadQuestions}) {
    return (
        <div className="start">
            <h1 className="start--title" >Quizzical</h1>
            <p className="start--description" >Developed by Arif Hasan</p>
            <button className="start--btn btn-purple" onClick={loadQuestions} >Start quiz</button>
        </div>
    );
}