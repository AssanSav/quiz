import React, { useState } from "react"
import { getMessage } from "../data/message"
import Pagination from "../components/pagination"
import QuizCard from "../components/QuizCard"

const QuizzesContainer = ({
    htmlQuizzes,
    htmlTitle, 
    cssQuizzes, 
    cssTitle
}) => {   

    const [summary, setSummary] = useState(false);
    const [whichLength, setWhichLength] = useState(false);
    
    const [retakeButton, setRetakeButton] = useState(false);

    const [rightAnswer, setRightAnswer] = useState(0)
    const [attempt, setAttemptCount] = useState(1)
    const [toggleTitle, setTitle] = useState(true)
    const [status, setStatus] = useState(true)

    let cssLength = cssQuizzes.length-1
    const [cssCounter, setCssCounter] = useState(cssLength)
    const [cssButton, setCssButton] = useState(false);
    
    let htmlLength = htmlQuizzes.length-1
    const [htmlCounter, setHtmlCounter] = useState(htmlLength)
    
    let allQuizzes = status ? htmlQuizzes : cssQuizzes 
    let titles = toggleTitle ? htmlTitle : cssTitle

    const cssQuestions = (e) => {
        if(cssCounter > 0){
            setCssCounter(cssCounter-1)  
        } 
        else if(rightAnswer >= 0 ) {
            setSummary(true)
            setRetakeButton(true)
        }
    }

    const nextQuestion = (e) => {
        if(htmlCounter > 0){
           setHtmlCounter(htmlCounter-1)  
        }
        else if(!status && !toggleTitle){
            cssQuestions(e)
        }
        else if(rightAnswer >= 0 ) {
            setSummary(true)
            setWhichLength(true)
            setCssButton(true) 
        }
    }

    const rightAnswerCount = () => {
        setRightAnswer(rightAnswer+1)
    } 

    const retakeQuiz = () => {
        setHtmlCounter(htmlLength)
        setCssCounter(cssLength)
        setTitle(true)
        setStatus(true)
        setAttemptCount(attempt+1)
        setRetakeButton(false)
        setSummary(false)
        setRightAnswer(0)
    }

    const setCssQuizzes = () => {
        setStatus(false)
        setTitle(false)
        setCssButton(false)
        setSummary(false)
        setWhichLength(false)
        setRightAnswer(0)
    }

    const renderQuizzes = allQuizzes.map((quiz, index) => {
        return (
            <div key={index}>
                < QuizCard 
                    rightAnswerCount={rightAnswerCount}
                    correctAnswer={quiz.correctAnswer} 
                    quizQuestion={quiz.text} 
                    quizAnswers={quiz.answers}
                    nextQuestion={nextQuestion}
                    quizzesTitle={ titles } 
                    totalRightAnswer={rightAnswer}
                    htmlLength={htmlLength}
                    htmlCounter={htmlCounter}
                    cssLength={cssLength}
                    summary={summary}
                    whichLength={whichLength}
                    attempt={attempt}
                    getMessage={getMessage()}
                />
            </div>
        )
    })
    return (
        <div style={{textAlign: "center"}}>
            {status ? renderQuizzes[htmlCounter]: renderQuizzes[cssCounter] }
            {retakeButton ? <button className="button"  onClick={retakeQuiz}>Retake</button> : ""}
            {cssButton ? <button className="button" onClick={setCssQuizzes}>Css</button> : ""}
        </div>    
        )
}



export default QuizzesContainer