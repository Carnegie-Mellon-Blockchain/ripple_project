// src/App.js
import React from 'react';
import Header from './Header';
import ConnectWallet from './ConnectWallet';
import Quiz from './Quiz';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'Berlin', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Lisbon', isCorrect: false },
    ],
  },
  
];

function App() {
  return (
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.content}>
        <ConnectWallet />
        <Quiz questions={questions} />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
