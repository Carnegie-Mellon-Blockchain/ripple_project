// src/Quiz.js
import React, { useState } from 'react';
import { useWallet } from "./context/WalletContext";

function Quiz({ quizzes, videoId }) {
	const { address } = useWallet();
  // State to store selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle answer selection
  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option, // Store the selected option for each question
    }));
  };

  // Submit answers to the API
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/submit_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
		  quiz: videoId,
          answers: selectedAnswers, // Send selected answers
        }),
      });

      if (response.ok) {
        console.log("Quiz submitted successfully!");
        setSubmitted(true);
      } else {
        console.error("Error submitting quiz:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to connect to server:", error);
    }
  };

  return (
    <div>
      <h2>Quiz</h2>
      <ul>
        {quizzes.map((q, questionIndex) => (
          <li key={questionIndex} style={{ marginBottom: "16px", listStyleType: "none" }}>
            <strong>{questionIndex + 1}. {q.question}</strong>
            <ul style={{ paddingLeft: "20px" }}>
              {q.options.map((option, optionIndex) => (
                <li key={optionIndex} style={{ listStyleType: "none" }}>
                  <label>
                    <input 
                      type="radio"
                      name={`question-${questionIndex}`} // Ensures only one answer per question
                      value={option}
                      checked={selectedAnswers[questionIndex] === option}
                      onChange={() => handleAnswerChange(questionIndex, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={submitted} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
        {submitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
}

export default Quiz;
