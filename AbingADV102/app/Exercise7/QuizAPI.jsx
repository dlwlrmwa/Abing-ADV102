import React, { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

import { useNavigation } from "@react-navigation/native";

function Exercise7() {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=${numQuestions}&category=9&difficulty=easy&type=multiple`
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (numQuestions >= 10 && numQuestions <= 30 && quizStarted) {
      fetchQuestions();
    }
  }, [numQuestions, quizStarted]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (!quizFinished) {
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.correct_answer) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, selectedAnswer]);
      handleNextQuestion();
    }
  };

  const handleQuizStart = () => {
    if (numQuestions >= 10 && numQuestions <= 30) {
      setQuizStarted(true);
    } else {
      setError("Please enter a valid number of questions between 10 and 30.");
    }
  };

  const handleGoBackToExercises = () => {
    navigation.navigate("exercises"); 
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading Questions...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (quizStarted && questions && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerChoices = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort();

    return (
      <div style={styles.quizContainer}>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestionIndex + 1}. {currentQuestion.question}</p>

        {answerChoices.map((answer, index) => (
          <button
            key={index}
            style={styles.option}
            onClick={() => handleAnswer(answer)}
            disabled={quizFinished}
          >
            {String.fromCharCode(65 + index)}. {answer}
          </button>
        ))}

        {quizFinished && (
          <div>
            <h3>
              Your Score: {score} / {questions.length}
            </h3>
            <button style={styles.backButton} onClick={handleGoBackToExercises}> {}
              Back to Exercises
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.quizContainer}>
      <h2>Set the number of questions (between 10 and 30)</h2>
      <input
        type="number"
        min="10"
        max="30"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleQuizStart}>
        Start Quiz
      </button>
    </div>
  );
}

const styles = {
  quizContainer: {
    textAlign: "center",
    padding: "30px",
    maxWidth: "500px",
    margin: "30px auto",
    backgroundColor: "#fce4ec", // Light pastel pink background
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  questionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#6a1b9a", // Deep purple for contrast
  },
  questionText: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "30px",
    color: "black", 
  },
  option: {
    display: "block",
    width: "100%",
    padding: "15px 20px",
    margin: "10px 0",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#e1bee7", // Light pastel purple option background
    color: "#black",
    fontWeight: "500",
    border: "none",
    borderRadius: "8px",
    textAlign: "left",
    transition: "background-color 0.3s ease",
  },
  optionHover: {
    backgroundColor: "#d1c4e9", // Slightly darker pastel purple on hover
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  button: {
    backgroundColor: "#ba68c8", // Medium pastel purple button
    color: "white",
    padding: "12px 25px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    margin: "0 10px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#ab47bc", // Darker pastel purple on hover
  },
  backButton: {
    backgroundColor: "#ce93d8", // Lighter pastel purple back button
    color: "black",
    padding: "12px 25px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  },
  backButtonHover: {
    backgroundColor: "#b39ddb", // Slightly darker pastel purple on hover
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    width: "80%",
    maxWidth: "300px",
    margin: "20px auto",
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: "50px",
  },
  spinner: {
    margin: "20px auto",
    border: "6px solid #ba68c8",
    borderTop: "6px solid #ce93d8",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
};


export default Exercise7;