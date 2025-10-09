import React from 'react';

const Prerequisites = ({ basicInfo, onNext, onBack }) => {

  const handleStartTest = () => {
    onNext();
  };

  const tabs = [
    {
      id: 'technical',
      title: 'Technical Requirements',
      icon: '💻',
      requirements: [
        'Stable internet connection (minimum 2 Mbps)',
        'Working microphone for voice recording',
        'Modern web browser (Chrome, Firefox, Safari, Edge)',
      ]
    },
    {
      id: 'assessment',
      title: 'Assessment Requirements',
      icon: '📚',
      requirements: [
        'Complete MCQ test (10 questions, 15 minutes)',
        'Answer knowledge test questions (10 questions)',
        'Record voice response for communication test',
        'Allow microphone access when prompted'
      ]
    },
    {
      id: 'time',
      title: 'Time Requirements',
      icon: '⏰',
      requirements: [
        'Complete in one session (no saving progress)',
        'Quiet environment for voice recording'
      ]
    }
  ];

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        maxWidth: '1200px',
        width: '100%'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Prerequisites
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#475569',
          lineHeight: '1.6',
          margin: 0
        }}>
          Before starting your AstroLokal assessment, please ensure you meet all the requirements below.
        </p>
      </div>

      {/* Requirements Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        width: '100%',
        marginBottom: '40px'
      }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '2px solid transparent',
              background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, #ea580c, #f97316) border-box`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              {tab.icon}
            </div>
            
            <h2 style={{ 
              color: '#ea580c', 
              margin: '0 0 25px 0',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {tab.title}
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%'
            }}>
              {tab.requirements.map((requirement, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ 
                    color: '#10b981', 
                    fontSize: '16px',
                    minWidth: '20px',
                    marginTop: '2px'
                  }}>
                    ✅
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: '1.4'
                  }}>
                    {requirement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Back Button - Hidden, handled by header */}
        <button
          onClick={onBack}
          style={{ display: 'none' }}
        >
          ← Back to Form
        </button>
        
        {/* Start Assessment Button - Hidden, handled by header */}
        <button
          onClick={handleStartTest}
          style={{ display: 'none' }}
        >
          Start Assessment →
        </button>
      </div>
    </div>
  );
};

export default Prerequisites;
