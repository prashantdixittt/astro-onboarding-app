import React, { useState, useEffect } from 'react';
import { getRandomQuestion } from '../data/questions';
import geminiService from '../services/geminiService';

const KnowledgeTest = ({ onComplete, onInputChange, onLoadingStart, onLoadingEnd }) => {
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
    if (onLoadingStart) onLoadingStart('Analyzing your astrological knowledge...');
    
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
      if (onLoadingEnd) onLoadingEnd();
    }
  };

  if (!question) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 100px)',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <h2 style={{ color: '#ea580c', marginBottom: '10px' }}>Loading Question...</h2>
          <p style={{ color: '#64748b' }}>Preparing your knowledge assessment</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto 40px auto'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '2.2rem',
          background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Knowledge Test
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#475569',
          lineHeight: '1.6',
          margin: 0
        }}>
          Demonstrate your astrological expertise by providing detailed answers to the questions below.
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        flex: 1,
        alignItems: 'stretch',
        height: 'calc(100vh - 200px)',
        minHeight: '500px'
      }}>
        {/* Question Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ea580c, #f97316) border-box',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '2rem'
            }}>📚</div>
            <h2 style={{ 
              color: '#ea580c', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Question
            </h2>
          </div>
          
          <div style={{ 
            flex: 1, 
            marginBottom: '20px',
            overflowY: 'auto',
            maxHeight: '300px',
            paddingRight: '10px'
          }}>
            <div style={{
              maxHeight: '173px', // 6 lines * 18px font * 1.6 line height
              overflowY: 'auto',
              marginBottom: '15px',
              paddingRight: '10px',
              padding: '10px'
            }}>
              <p style={{ 
                fontSize: '18px', 
                lineHeight: '1.6', 
                color: '#374151',
                margin: 0
              }}>
                {question.question}
              </p>
            </div>
            
            {/* Language indicator outside scrollable content */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#fef3c7',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#92400e',
              fontWeight: '500',
              marginBottom: '20px'
            }}>
              <span>🌐</span>
              <span>Language: {question.language}</span>
            </div>
          </div>

          {/* Additional Components */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Help Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '10px',
              border: '1px solid #bae6fd'
            }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0369a1', marginBottom: '2px' }}>
                  Answering Tips
                </div>
                <div style={{ fontSize: '12px', color: '#0c4a6e' }}>
                  Include planetary positions, aspects, and practical guidance
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              border: '1px solid #bbf7d0'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🆘</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#166534', marginBottom: '2px' }}>
                  Need Help?
                </div>
                <div style={{ fontSize: '12px', color: '#14532d' }}>
                  Contact support if you encounter any issues
                </div>
              </div>
            </div>

            {/* Time Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#fefce8',
              borderRadius: '10px',
              border: '1px solid #fde047'
            }}>
              <span style={{ fontSize: '1.2rem' }}>⏱️</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#a16207', marginBottom: '2px' }}>
                  Take Your Time
                </div>
                <div style={{ fontSize: '12px', color: '#713f12' }}>
                  No time limit - provide your best answer
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '2rem'
            }}>✍️</div>
            <h3 style={{ 
              color: '#ea580c', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Your Answer
            </h3>
          </div>
          
          <textarea
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              if (onInputChange) onInputChange();
            }}
            placeholder="Provide your detailed astrological prediction and guidance. Include relevant planetary positions, aspects, and practical advice..."
            style={{
              width: '100%',
              height: '100%',
              minHeight: '300px',
              maxHeight: '400px',
              padding: '20px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '1.6',
              resize: 'vertical',
              fontFamily: 'inherit',
              backgroundColor: '#f8fafc',
              transition: 'all 0.3s ease',
              outline: 'none',
              flex: 1,
              overflowY: 'auto'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ea580c';
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.boxShadow = 'none';
            }}
            disabled={isLoading}
          />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
            fontSize: '14px',
            color: '#64748b'
          }}>
            <span>💡 Be specific and include astrological reasoning</span>
            <span>{userAnswer.length} characters</span>
          </div>
        </div>
      </div>

      {/* Submit Button - Hidden, handled by header */}
      <div style={{ display: 'none' }}>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !userAnswer.trim()}
          data-testid="knowledge-submit"
          style={{
            background: isLoading ? 'linear-gradient(135deg, #6b7280, #9ca3af, #d1d5db)' : 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
            color: 'white',
            padding: '14px 28px',
            border: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isLoading || !userAnswer.trim() ? 'not-allowed' : 'pointer',
            boxShadow: isLoading ? '0 4px 15px rgba(107, 114, 128, 0.3)' : '0 4px 15px rgba(249, 115, 22, 0.3)',
            transition: 'all 0.3s ease',
            opacity: isLoading || !userAnswer.trim() ? 0.8 : 1,
            minWidth: '180px',
            outline: 'none'
          }}
        >
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span>⏳</span>
              <span>Evaluating...</span>
            </span>
          ) : (
            <span>Submit Answer</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default KnowledgeTest;