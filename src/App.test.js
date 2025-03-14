import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const questions = [
  {
    id: 1,
    question: 'At the start of a standard game of Monopoly, if you throw a double six, which square would you land on?',
    correctAnswer: 'Electric Company',
  },
  {
    id: 2,
    question: 'What does CPU stand for?',
    correctAnswer: 'Central Processing Unit',
  },
  {
    id: 3,
    question: 'Which is the largest ocean on Earth?',
    correctAnswer: 'Pacific Ocean',
  },
  {
    id: 4,
    question: 'Who was the first President of the United States?',
    correctAnswer: 'George Washington',
  },
  {
    id: 5,
    question: 'Which country won the FIFA World Cup in 2018?',
    correctAnswer: 'France',
  },
];

describe('Quiz App', () => {
  test('renders the first question correctly', () => {
    render(<App />);
    expect(screen.getByText(/Question 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(questions[0].question)).toBeInTheDocument();
  });

  test('selecting an answer updates state and displays feedback', () => {
    render(<App />);

    const option = screen.getByText(questions[0].correctAnswer);
    fireEvent.click(option);

    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  test('clicking next question advances to the next question', () => {
    render(<App />);

    fireEvent.click(screen.getByText(questions[0].correctAnswer));

    fireEvent.click(screen.getByText(/Next Question/i));

    expect(screen.getByText(/Question 2 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(questions[1].question)).toBeInTheDocument();
  });

  test('final question displays "Finish" button', () => {
    render(<App />);
    
    for (let i = 0; i < questions.length; i++) {
      fireEvent.click(screen.getByText(questions[i].correctAnswer));
      
      if (i < questions.length - 1) {
        fireEvent.click(screen.getByText(/Next Question/i));
      }
    }

    expect(screen.getByText(/Finish/i)).toBeInTheDocument();
  });
});
