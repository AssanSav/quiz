import React, { Component} from 'react'


export default class QuizCardClassComponent extends Component {
    constructor(props) {
        super({props})
        this.state = {
            correctAnswer: "",
            incorrectAnswer: ""
        }
    }

    handleCorrectAnswer = (e) => {
        this.setState({
            correctAnswer: "<img src='cat.jpg' />"
        })
    }

    handleWrongAnswer = () => {
        this.setState({
            incorrectAnswer: "<img>cat.jpg</img>"
        })
    }


    render (){
        return (
            <di>
                <button className="correct" onClick={this.handleCorrectAnswer}>{this.state.correctAnswer}</button>
                <button className="incorrect" onClick={this.handleWrongAnswer}>{this.state.incorrectAnswer}</button>
            </di>
        )
    }
}