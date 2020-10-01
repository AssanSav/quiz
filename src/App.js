import React, { useEffect } from "react";
import QuizzesContainer from "./containers/QuizzesContainer";
import { quizzes } from "./data/quizzes";
import "./App.css";

const App = () => {
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  let shuffleQuizzes = (array) => {
    let result = [];
    array.questions.forEach((quiz) => {
      result.push({
        text: quiz.text,
        correctAnswer: quiz.correctAnswer,
        answers: shuffleArray(quiz.incorrectAnswers.concat(quiz.correctAnswer)),
      });
    });
    return result;
  };

  let htmlQuizzes = shuffleQuizzes(quizzes[0]);
  let cssQuizzes = shuffleQuizzes(quizzes[1]);

  useEffect(() => {
    shuffleQuizzes(quizzes[0]);
    shuffleQuizzes(quizzes[1]);
  });

  return (
    <div className="App">
      <QuizzesContainer
        htmlQuizzes={htmlQuizzes}
        cssQuizzes={cssQuizzes}
        htmlTitle={quizzes[0].title}
        cssTitle={quizzes[1].title}
      />
    </div>
  );
};

export default App;
