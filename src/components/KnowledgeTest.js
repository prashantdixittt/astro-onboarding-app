import React, { useState, useEffect } from 'react';
import { getRandomQuestion } from '../data/questions';
import geminiService from '../services/geminiService';

const KnowledgeTest = ({ onComplete }) => {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuestion(getRandomQuestion());
  }, []);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert('Please provide an answer');
      return;
    }

    setIsLoading(true);
    try {
      const result = await geminiService.scoreKnowledgeAnswer(
        question.question,
        question.correctAnswer,
        userAnswer,
        question.language
      );

      const knowledgeResult = {
        questionId: question.id,
        question: question.question,
        userAnswer,
        result
      };

      onComplete({ averageScore: result.score, detailedResults: [knowledgeResult] });
    } catch (error) {
      alert('Error submitting answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!question) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading question...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Knowledge Test</h2>

      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Question:</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{question.question}</p>
        <small style={{ color: '#666' }}>Language: {question.language}</small>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Your Answer:
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Provide your astrological prediction and guidance..."
          style={{
            width: '100%',
            height: '150px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            resize: 'vertical'
          }}
          disabled={isLoading}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !userAnswer.trim()}
        style={{
          backgroundColor: isLoading ? '#ccc' : '#4caf50',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Evaluating...' : 'Complete Knowledge Test'}
      </button>
    </div>
  );
};

export default KnowledgeTest;