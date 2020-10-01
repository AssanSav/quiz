import React from 'react';
import './App.css';

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


  return (  );
}
 
export default App;


