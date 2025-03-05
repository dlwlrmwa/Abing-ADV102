import React, { useState, useEffect } from "react";
import axios from "axios";

function Exercise7({ onBack }) {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

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
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, selectedAnswer]);
    handleNextQuestion();
  };

  const handleQuizStart = () => {
    if (numQuestions >= 10 && numQuestions <= 30) {
      setQuizStarted(true);
    } else {
      setError("Please enter a valid number of questions between 10 and 30.");
    }
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

    return (
      <div style={styles.quizContainer}>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>

        {currentQuestion.incorrect_answers
          .concat(currentQuestion.correct_answer)
          .sort()
          .map((answer, index) => (
            <button key={index} style={styles.option} onClick={() => handleAnswer(answer)}>
              {answer}
            </button>
          ))}

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button style={styles.button} onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>

        {currentQuestionIndex === questions.length - 1 && (
          <div>
            <h3>Your Score: {score} / {questions.length}</h3>
            <button style={styles.backButton} onClick={onBack}>Back to Exercises</button>
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
      <button style={styles.button} onClick={handleQuizStart}>Start Quiz</button>
    </div>
  );
}

const styles = {
  quizContainer: { 
    textAlign: 'center', 
    padding: '20px', 
    maxWidth: '600px', 
    margin: '0 auto' 
  },

  option: { display: 'block', 
    width: '100%', 
    padding: '10px', 
    margin: '5px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    backgroundColor: '#ffc8dd', 
    color: '#000', 
    fontWeight: 'bold', 
    border: 'none', 
    borderRadius: '5px' 
  },

  buttonContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    marginTop: '20px' 
  },
  button: { 
    backgroundColor: '#ff1493' , 
    color: '#fff', 
    padding: '10px 20px', 
    fontSize: '18px', 
    cursor: 'pointer', 
    border: 'none', 
    borderRadius: '5px', 
    margin: '0 10px' 
  },
  backButton: { 
    backgroundColor: '#ff1493', 
    color: '#fff', 
    padding: '10px 20px', 
    fontSize: '18px', 
    cursor: 'pointer', 
    border: 'none', 
    borderRadius: '5px', 
    marginTop: '20px' 
  },
  input: { 
    padding: '10px', 
    fontSize: '16px', 
    marginBottom: '20px', 
    borderRadius: '8px', 
    border: '1px solid #ccc' 
  },
  loadingContainer: { 
    textAlign: 'center', 
    marginTop: '50px' 
  },
  spinner: { 
    margin: '20px auto', 
    border: '6px solidrgb(163, 38, 121)', 
    borderTop: '6px solidrgb(240, 64, 123)', 
    borderRadius: '50%', 
    width: '40px', 
    height: '40px', 
    animation: 'spin 1s linear infinite' 
  },
};

export default Exercise7;