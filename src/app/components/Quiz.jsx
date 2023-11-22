"use client";
import React, { useState, useEffect, useRef } from "react";

const Quiz = ({ data }) => {
  const [currentSection, setCurrentSection] = useState();
  const [quizDuration, setQuizDuration] = useState(5);
  const [numQuestions, setNumQuestions] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizResult, setQuizResult] = useState(null); // Store the result details

  const timerRef = useRef(null);

  useEffect(() => {
    setCurrentSection(Object.keys(data)[0]);
  }, [data]);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        const elapsedTime = (new Date() - quizStartTime) / 1000;
        const remainingTime = Math.max(0, quizDuration * 60 - elapsedTime);
        setTimeRemaining(remainingTime);

        if (remainingTime === 0) {
          clearInterval(timerRef.current);
          setQuizCompleted(true);
        }
      }, 1000);
    };

    if (quizStarted && timeRemaining > 0) {
      startTimer();
    }

    return () => {
      const currentTimer = timerRef.current;
      clearInterval(currentTimer);
    };
  }, [quizStarted, quizStartTime, quizDuration, timeRemaining]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleDurationChange = (e) => {
    setQuizDuration(parseInt(e.target.value, 10));
  };

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(parseInt(e.target.value, 10));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(numQuestions).fill(null));
    setQuizStartTime(new Date());
    setTimeRemaining(quizDuration * 60);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < numQuestions) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleAnswerSelect = (choiceIndex) => {
    setUserAnswers((prevAnswers) =>
      prevAnswers.map((answer, index) =>
        index === currentQuestionIndex ? choiceIndex : answer,
      ),
    );
  };

  const handleCompleteQuiz = () => {
    setQuizCompleted(true);
    clearInterval(timerRef.current); // Stop the timer
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    setQuizStarted(false);

    // Generate the result only if the quiz has started
    if (quizStarted) {
      const score = calculateScore();
      const quizEndTime = new Date();
      const quizTimeInMinutes = (quizEndTime - quizStartTime) / (1000 * 60);

      const resultDetails = data[currentSection]?.questions
        .slice(0, numQuestions)
        .map((question, index) => {
          return {
            question: question.question,
            userAnswer: question.choices[userAnswers[index]],
            correctAnswer: question.choices[question.correctAnswerIndex],
          };
        });

      setQuizResult({
        score,
        timeTaken: quizTimeInMinutes.toFixed(2),
        details: resultDetails,
      });
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, userAnswer, index) => {
      const correctAnswerIndex =
        data[currentSection]?.questions[index].correctAnswerIndex;
      return userAnswer === correctAnswerIndex ? score + 1 : score;
    }, 0);
  };

  const renderSetupPhase = () => (
    <div className="mx-auto w-full rounded-lg border p-6 shadow-md md:w-2/3 lg:w-1/2">
      <h2 className="mb-4 text-2xl font-bold">Quiz Setup</h2>
      <div className="mb-4 flex justify-between px-4">
        <label className="mr-4 text-lg">Select Section:</label>
        <select
          value={currentSection}
          onChange={(e) => handleSectionChange(e.target.value)}
          className="w-52 rounded-sm border border-cyan-950 bg-slate-100 px-2 py-1 text-slate-950"
        >
          {Object.keys(data).map((section) => (
            <option key={section} value={section}>
              {data[section].title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 flex justify-between px-4">
        <label className="mr-4 text-lg">Select Duration (minutes):</label>
        <input
          type="number"
          min="1"
          value={quizDuration || ""}
          onChange={handleDurationChange}
          className="w-52 rounded-sm border border-cyan-950 bg-slate-100 px-2 py-1 text-slate-950"
        />
      </div>
      <div className="mb-4 flex justify-between px-4">
        <label className="mr-4 text-lg">Number of Questions:</label>
        <input
          type="number"
          min="1"
          value={numQuestions || ""}
          onChange={handleNumQuestionsChange}
          className="w-52 rounded-sm border border-cyan-950 bg-slate-100 px-2 py-1 text-slate-950"
        />
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        onClick={handleStartQuiz}
        disabled={!currentSection || !quizDuration || !numQuestions}
      >
        Start Quiz
      </button>
    </div>
  );

  const renderQuestion = () => {
    const currentQuestion =
      data[currentSection]?.questions[currentQuestionIndex];

    return (
      <div className="mx-auto w-full rounded-lg p-6 text-start shadow-md sm:w-2/3">
        <h2 className="mb-4 text-2xl font-bold">{currentQuestion.question}</h2>
        <div className="space-y-2">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              className={`block w-full rounded bg-blue-500 px-4 py-2 text-left text-white ${
                userAnswers[currentQuestionIndex] === index ? "bg-blue-900" : ""
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              {String.fromCharCode(97 + index)}. {choice}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const score = calculateScore();
    const quizEndTime = new Date();
    const quizTimeInMinutes = (quizEndTime - quizStartTime) / (1000 * 60);

    const resultDetails = data[currentSection]?.questions
      .slice(0, numQuestions)
      .map((question, index) => {
        return {
          question: question.question,
          userAnswer: question.choices[userAnswers[index]],
          correctAnswer: question.choices[question.correctAnswerIndex],
        };
      });

    return (
      <div className="rounded-lg  p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Quiz Result</h2>
        <p className="text-lg">
          Your score: {score} / {numQuestions}
        </p>
        <p className="text-lg">
          Time taken: {quizTimeInMinutes.toFixed(2)} minutes
        </p>
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">Question-wise details:</h3>
          {resultDetails.map((result, index) => (
            <div key={index} className="mb-4">
              <p className="text-md mb-1 font-medium">Question {index + 1}:</p>
              <p className="mb-1">{result.question}</p>
              <p
                className={`mb-1 text-sm ${
                  result.userAnswer === result.correctAnswer
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Your Answer: {result.userAnswer}
              </p>
              <p className="mb-1 text-sm">
                Correct Answer: {result.correctAnswer}
              </p>
            </div>
          ))}
        </div>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
          onClick={handleFinishQuiz}
        >
          Finish Quiz
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {!quizStarted ? (
        renderSetupPhase()
      ) : (
        <div>
          <div className="mx-4 flex justify-between">
            <p className="mb-2 text-lg">
              Question {currentQuestionIndex + 1} of {numQuestions}
            </p>
            <p className="mb-4 text-lg">
              Time Remaining: {Math.floor(timeRemaining / 60)}:
              {Math.floor(timeRemaining % 60)
                .toString()
                .padStart(2, "0")}
            </p>
          </div>
          {quizCompleted ? (
            renderResult()
          ) : (
            <div className="flex w-full flex-col items-center">
              {renderQuestion()}
              <button
                className="my-2 w-52 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                onClick={handleNextQuestion}
              >
                Next
              </button>
              <button
                className="my-2 w-52 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                onClick={handleCompleteQuiz}
              >
                Complete Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
