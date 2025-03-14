import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    id: 1,
    total: 5,
    category: 'Entertainment: Board Games',
    difficulty: 'Easy',
    question: 'At the start of a standard game of Monopoly, if you throw a double six, which square would you land on?',
    options: ['Chance', 'Water Works', 'Electric Company', 'Community Chest'],
    correctAnswer: 'Electric Company'
  },
  {
    id: 2,
    total: 5,
    category: 'Science: Computers',
    difficulty: 'Medium',
    question: 'What does CPU stand for?',
    options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Processor Unit'],
    correctAnswer: 'Central Processing Unit'
  },
  {
    id: 3,
    total: 5,
    category: 'Geography',
    difficulty: 'Hard',
    question: 'Which is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean'
  },
  {
    id: 4,
    total: 5,
    category: 'History',
    difficulty: 'Medium',
    question: 'Who was the first President of the United States?',
    options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
    correctAnswer: 'George Washington'
  },
  {
    id: 5,
    total: 5,
    category: 'Sports',
    difficulty: 'Hard',
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    correctAnswer: 'France'
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const getDifficultyStars = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '★☆☆☆';
      case 'Medium':
        return '★★☆☆';
      case 'Hard':
        return '★★★☆';
      default:
        return '☆☆☆☆';
    }
  };

  const question = questions[currentQuestion];
  const currentScorePercentage = Math.round((score / questions.length) * 100);


  const questionProgress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="question-progress-bar">
        <div className="question-progress-fill" style={{ width: `${questionProgress}%` }}></div>
      </div>
      <div className="question-header">
        <h2>Question {question.id} of {question.total}</h2>
        <div className="category">
          {question.category}
          <span className="difficulty">{getDifficultyStars(question.difficulty)}</span>
        </div>
      </div>

      <div className="question-content">
        <p>{question.question}</p>
        <div className="options">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerClick(option)}
              className={`option-button 
                ${isAnswered && option === question.correctAnswer ? 'correct' : ''} 
                ${isAnswered && option === selectedAnswer && option !== question.correctAnswer ? 'incorrect' : ''}`}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="feedback">
            <p className={`correct-text ${selectedAnswer === question.correctAnswer ? 'green' : 'red'}`}>
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Sorry!'}
            </p>
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </div>
        )}
      </div>

      <div className="score-bar">
        <div className="score-text">Score: {currentScorePercentage}%</div>
        <div className="score-progress">
          <div
            className="score-fill"
            style={{ width: `${currentScorePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
