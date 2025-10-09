import React, { useState } from 'react';

const ThankYou = ({ onRestart, basicInfo, mcqResults, knowledgeResults, communicationResults }) => {
  const [showResults, setShowResults] = useState(false);

  // Calculate overall score
  const calculateOverallScore = () => {
    if (!mcqResults || !knowledgeResults || !communicationResults) {
      return null;
    }

    const mcqScore = mcqResults.mcqResults?.score || 0;
    const knowledgeScore = knowledgeResults.score || 0;
    const communicationScore = communicationResults.score || 0;

    // Weighted average: MCQ 30%, Knowledge 40%, Communication 30%
    const overallScore = Math.round(
      (mcqScore * 0.3) + (knowledgeScore * 0.4) + (communicationScore * 0.3)
    );

    return {
      overall: overallScore,
      mcq: mcqScore,
      knowledge: knowledgeScore,
      communication: communicationScore
    };
  };

  const getGradeInfo = (score) => {
    if (score >= 80) {
      return { grade: 'Excellent', color: '#10b981', bgColor: '#d1fae5', recommendation: 'Recommended for onboarding' };
    } else if (score >= 60) {
      return { grade: 'Good', color: '#f59e0b', bgColor: '#fef3c7', recommendation: 'Additional training suggested' };
    } else {
      return { grade: 'Needs Improvement', color: '#ef4444', bgColor: '#fee2e2', recommendation: 'Comprehensive training required' };
    }
  };

  const scores = calculateOverallScore();
  const hasResults = mcqResults && knowledgeResults && communicationResults;

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Subtle Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Success Animation */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          boxShadow: '0 15px 30px rgba(249, 115, 22, 0.2)',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <div style={{
            fontSize: '2.5rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
        </div>

        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 'bold',
            marginBottom: '25px'
          }}>
            Thank You!
          </h1>

          <h2 style={{
            color: '#ea580c',
            marginBottom: '20px',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            Assessment Complete!
          </h2>

          <p style={{
            fontSize: '18px',
            color: '#475569',
            lineHeight: '1.6',
            margin: 0,
            maxWidth: '600px'
          }}>
            Your responses have been successfully submitted. {hasResults ? 'Click the button below to view your detailed results.' : 'Our team will review your assessment and reach out to you soon with the results and next steps.'}
          </p>
        </div>

        {/* View Results Button */}
        {hasResults && (
          <button
            onClick={() => setShowResults(true)}
            style={{
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(135deg, #ea580c, #f97316)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 30px rgba(249, 115, 22, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.3)';
            }}
          >
            📊 View My Results
          </button>
        )}
      </div>

      {/* Results Modal */}
      {showResults && scores && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          overflow: 'auto'
        }}
        onClick={() => setShowResults(false)}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowResults(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#fee2e2',
                color: '#ef4444',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ef4444';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#fee2e2';
                e.target.style.color = '#ef4444';
              }}
            >
              ×
            </button>

            {/* Modal Header */}
            <div style={{
              padding: '40px',
              borderBottom: '2px solid #f1f5f9',
              textAlign: 'center'
            }}>
              <h2 style={{
                margin: '0 0 10px 0',
                fontSize: '2rem',
                color: '#1e293b',
                fontWeight: 'bold'
              }}>
                Assessment Results
              </h2>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#64748b'
              }}>
                Comprehensive evaluation of your performance
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '40px' }}>
              {/* Overall Score Card */}
              <div style={{
                background: 'linear-gradient(135deg, #ea580c, #f97316)',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '32px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  opacity: 0.9
                }}>
                  Overall Score
                </div>
                <div style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}>
                  {scores.overall}%
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  {getGradeInfo(scores.overall).grade}
                </div>
                <div style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  opacity: 0.9
                }}>
                  {getGradeInfo(scores.overall).recommendation}
                </div>
              </div>

              {/* Individual Test Results */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {/* MCQ Test */}
                <div style={{
                  padding: '24px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    📝 MCQ Test
                  </div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#ea580c',
                    marginBottom: '8px'
                  }}>
                    {scores.mcq}%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#64748b'
                  }}>
                    {mcqResults.mcqResults?.correctAnswers}/{mcqResults.mcqResults?.totalQuestions} Correct
                  </div>
                </div>

                {/* Knowledge Test */}
                <div style={{
                  padding: '24px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    🎓 Knowledge Test
                  </div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#ea580c',
                    marginBottom: '8px'
                  }}>
                    {scores.knowledge}%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#64748b'
                  }}>
                    Depth & Accuracy
                  </div>
                </div>

                {/* Communication Test */}
                <div style={{
                  padding: '24px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    🎙️ Communication Test
                  </div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#ea580c',
                    marginBottom: '8px'
                  }}>
                    {scores.communication}%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#64748b'
                  }}>
                    Clarity & Expression
                  </div>
                </div>
              </div>

              {/* Candidate Information */}
              {basicInfo && (
                <div style={{
                  padding: '24px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                    Candidate Information
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    fontSize: '14px'
                  }}>
                    <div>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Name:</span>
                      <span style={{ marginLeft: '8px', color: '#1e293b' }}>{basicInfo.name}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Experience:</span>
                      <span style={{ marginLeft: '8px', color: '#1e293b' }}>{basicInfo.yearOfExperience} years</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Expertise:</span>
                      <span style={{ marginLeft: '8px', color: '#1e293b' }}>
                        {Array.isArray(basicInfo.experienceType)
                          ? basicInfo.experienceType.join(', ')
                          : basicInfo.experienceType}
                      </span>
                    </div>
                    {basicInfo.preferredLanguage && (
                      <div>
                        <span style={{ color: '#64748b', fontWeight: '600' }}>Language:</span>
                        <span style={{ marginLeft: '8px', color: '#1e293b', textTransform: 'capitalize' }}>
                          {basicInfo.preferredLanguage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setShowResults(false)}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: 'linear-gradient(135deg, #ea580c, #f97316)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = '0.9';
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                Close Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default ThankYou;