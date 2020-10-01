import React, { useRef, useState} from 'react'
import propTypes from "prop-types"

const QuizCard = ({
    attempt,
    getMessage,
    whichLength,
    totalRightAnswer,
    summary,
    htmlLength,
    cssLength,
    rightAnswerCount,
    nextQuestion,
    correctAnswer,
    quizzesTitle,
    quizAnswers,
    quizQuestion,
  }) => {

    const [showNextButton, setShowNextButton] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [correct, setCorrect] = useState(false)
    const refAnswer = useRef(null)
    const alpha = ["A", "B", "C", "D"]

    const setUncheckable = (answer) => {
        if(answer === correctAnswer){  
            Array.from(refAnswer.current.children).forEach(li => {
                if(li.children[1].textContent !== answer){
                    li.style.pointerEvents = "none"                         
                }
                else {
                    li.style.border = "2px solid green" 
                    li.style.pointerEvents = "none"
                }
            })
        }
    }

    const checkAnswer = (event) => {
        if(event.target.textContent === correctAnswer){
            event.target.parentElement.style.border = "2px solid green"
            quizAnswers.forEach(answer => {
                setUncheckable(answer)
            }) 
            rightAnswerCount(event)
            setCorrect(true)
        } else {
            setIncorrect(true)
            event.target.parentElement.style.border = "2px solid red"
            event.target.style.textDecoration = "line-through" 
            event.target.style.pointerEvents = "none"
            
            quizAnswers.forEach(answer => {
                if(answer === correctAnswer){  
                    setUncheckable(answer)
                }
            })
        }
    }

    const runOnClick = (event) => {
        checkAnswer(event);
        setShowNextButton(true);
    }
console.log(quizAnswers)
    const renderAnswers = ["<src img='cat.jpg' />", "<img>cat.jpg</img>", "<img src='cat.jpg' />", "<src>cat.jpg</img>"].map((answer, index) => {
        return (
            <li className="answers" key={index}  >
                <div >
                    <strong style={{marginRight: "15px"}}>{alpha[index]}.</strong> 
                </div>
                <div onClick={(e) => runOnClick(e)} >
                    {answer} 
                </div>
            </li>
        )
    })

  
    return summary ? 
    <div> 
        <h1>
            {quizzesTitle}
        </h1>
        <h3 className="summary" >You got {totalRightAnswer} of {whichLength ? htmlLength+1 : cssLength+1} questions right!</h3>
        {attempt > 1 ? <h3 style={{paddingTop:"20px"}}>This was attempt number {attempt}.</h3> : ""}
        <h2>{getMessage}</h2>
    </div>
     :
        <div className="container" >
            <h1>
                {quizzesTitle}
            </h1>
            <div className="quiz_card" >
                <h2>
                    {quizQuestion}
                </h2>
                <ul ref={refAnswer} style={{cursor:'pointer'}}>
                    {renderAnswers}
                </ul>
                <div className="">
                    {correct ? <p><strong style={{color: "green"}}>Correct!</strong></p> : ""}
                    {incorrect  ? <strong><p style={{color: "red"}}>Incorrect Answer!</p></strong> : ""}
                </div>
            </div>
            <h3 className="congrats" style={{textAlign: "center"}}>{""}</h3>
            <h2 className="attempt_count" style={{textAlign: "center"}}>{""}</h2>
            {showNextButton ? <button className="button" onClick={(e) => nextQuestion(e)} >Next</button> : ""}
        </div>
}

QuizCard.propTypes = {
    rightAnswerCount: propTypes.func.isRequired,
    correctAnswer: propTypes.string.isRequired
}

export default QuizCard
