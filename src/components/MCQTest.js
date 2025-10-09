import React, { useState, useEffect } from 'react';
import { getMCQsByExperience } from '../data/mcqQuestions';

const MCQTest = ({ basicInfo, onComplete, onQuestionChange, onLoadingStart, onLoadingEnd }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (onLoadingStart) onLoadingStart('Processing your MCQ responses...');
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const mcqResults = calculateScore();
      
      onComplete({
        basicInfo,
        mcqResults
      });
      
      if (onLoadingEnd) onLoadingEnd();
    }, 1000);
  };

  useEffect(() => {
    // Get MCQs based on experience type and years
    if (basicInfo && basicInfo.experienceType) {
      const mcqs = getMCQsByExperience(basicInfo.experienceType, basicInfo.yearOfExperience);
      setQuestions(mcqs);
    }
  }, [basicInfo]);


  useEffect(() => {
    // Notify parent of current question state
    if (onQuestionChange) {
      const currentQuestionId = questions[currentQuestion]?.id;
      const isCurrentQuestionAnswered = !!answers[currentQuestionId];
      
      onQuestionChange({
        currentQuestion,
        totalQuestions: questions.length,
        isLastQuestion: currentQuestion === questions.length - 1,
        isSubmitting,
        isCurrentQuestionAnswered
      });
    }
  }, [currentQuestion, questions.length, isSubmitting, answers, questions, onQuestionChange]);


  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswer
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    const detailedResults = questions.map(question => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      
      return {
        id: question.id,
        question: question.question,
        selectedAnswer: answers[question.id] || 'Not answered',
        correctAnswer: question.correctAnswer,
        isCorrect
      };
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    
    return {
      score,
      correctAnswers,
      totalQuestions: questions.length,
      detailedResults
    };
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    // Check if current question is answered before allowing navigation
    const currentQuestionId = questions[currentQuestion]?.id;
    if (!answers[currentQuestionId]) {
      alert('Please select an answer before proceeding to the next question.');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (questions.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading questions...</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ color: '#ea580c', margin: 0 }}>
          📝 MCQ Test - {basicInfo.experienceType}
        </h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <span style={{ 
            backgroundColor: '#ea580c',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px'
          }}>
            {answeredCount}/{questions.length} Answered
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div style={{ 
          width: '100%', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '10px',
          height: '8px'
        }}>
          <div style={{ 
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            backgroundColor: '#4caf50',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '30px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          marginBottom: '25px',
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#333',
          textAlign: 'left'
        }}>
          {question.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {question.options.map((option, index) => (
            <label 
              key={index}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                border: `2px solid ${answers[question.id] === option ? '#4caf50' : '#ddd'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: answers[question.id] === option ? '#e8f5e8' : 'white',
                transition: 'all 0.3s ease',
                fontSize: '16px'
              }}
              onMouseOver={(e) => {
                if (answers[question.id] !== option) {
                  e.target.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseOut={(e) => {
                if (answers[question.id] !== option) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => handleAnswerSelect(question.id, option)}
                style={{ 
                  marginRight: '12px',
                  transform: 'scale(1.2)'
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation - Hidden, handled by header */}
      <div style={{ display: 'none' }}>
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          style={{
            padding: '12px 24px',
            backgroundColor: currentQuestion === 0 ? '#ccc' : '#ea580c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          ← Previous
        </button>

        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: `2px solid ${currentQuestion === index ? '#4caf50' : '#ddd'}`,
                backgroundColor: answers[questions[index].id] ? '#4caf50' : 
                               currentQuestion === index ? '#e8f5e8' : 'white',
                color: answers[questions[index].id] ? 'white' : currentQuestion === index ? '#333' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation Buttons - Hidden, handled by header */}
        <div style={{ display: 'none' }}>
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              data-testid="mcq-submit"
              style={{
                padding: '12px 24px',
                backgroundColor: isSubmitting ? '#ccc' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              data-testid="mcq-next"
              style={{
                padding: '12px 24px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Question Overview */}
      <div style={{ 
        backgroundColor: '#f0f8ff',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #e1f5fe'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Quick Overview:</h4>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '14px' }}>
          <span>📊 Difficulty: {basicInfo.yearOfExperience <= 2 ? 'Beginner' : 
                                  basicInfo.yearOfExperience <= 5 ? 'Intermediate' : 'Expert'}</span>
          <span>✅ Answered: {answeredCount}</span>
          <span>❓ Remaining: {questions.length - answeredCount}</span>
        </div>
      </div>
    </div>
  );
};

export default MCQTest;