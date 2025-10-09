import React from 'react';
import Logo from './ui/Logo';

const StartScreen = ({ onStartAssessment }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      width: '100%',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite',
        zIndex: 0
      }} />

      {/* Header */}
      <div style={{ marginBottom: '50px', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '25px',
          marginBottom: '25px',
          animation: 'slideInDown 1s ease-out'
        }}>
          <Logo size={100} />
          <h1 style={{ 
            margin: 0,
            fontSize: '3.5rem',
            background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 'bold',
            textShadow: '0 0 30px rgba(249, 115, 22, 0.3)',
            animation: 'titleGlow 2s ease-in-out infinite alternate'
          }}>
            AstroLokal
          </h1>
        </div>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#475569',
          maxWidth: '700px', 
          lineHeight: '1.7',
          margin: '0 auto',
          animation: 'fadeInUp 1s ease-out 0.3s both'
        }}>
          Welcome to AstroLokal's cosmic evaluation system. Discover your astrological expertise through 
          comprehensive knowledge and communication assessments guided by the stars.
        </p>
      </div>
      
      {/* Assessment Info */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px', 
        marginBottom: '50px',
        width: '100%',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ea580c, #f97316) border-box',
          borderRadius: '20px', 
          padding: '30px',
          backgroundColor: 'white',
          boxShadow: '0 10px 30px rgba(249, 115, 22, 0.1)',
          animation: 'slideInLeft 1s ease-out 0.6s both'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '20px'
          }}>📚</div>
          <h3 style={{ 
            color: '#ea580c', 
            marginBottom: '15px',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>Knowledge Test</h3>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            color: '#475569',
            margin: 0
          }}>
            Answer astrological questions and get scored on accuracy, relevance, 
            and proper use of terminology. Supports both English and Hindi languages.
          </p>
        </div>
        
        <div style={{ 
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #f97316, #fb923c) border-box',
          borderRadius: '20px', 
          padding: '30px',
          backgroundColor: 'white',
          boxShadow: '0 10px 30px rgba(251, 191, 36, 0.1)',
          animation: 'slideInRight 1s ease-out 0.8s both'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '20px'
          }}>🎤</div>
          <h3 style={{ 
            color: '#f97316', 
            marginBottom: '15px',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>Communication Test</h3>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            color: '#475569',
            margin: 0
          }}>
            Record your voice response to a client scenario and get evaluated on 
            clarity, confidence, empathy, and professional communication skills.
          </p>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartAssessment}
        style={{
          background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
          color: 'white',
          padding: '16px 32px',
          border: 'none',
          borderRadius: '50px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
          marginBottom: '40px',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          animation: 'pulse 2s infinite, slideInUp 1s ease-out 1s both',
          overflow: 'hidden',
          maxWidth: '300px'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-5px) scale(1.05)';
          e.target.style.boxShadow = '0 15px 40px rgba(249, 115, 22, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)';
        }}
      >
        <span style={{ 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          Start Assessment
        </span>
      </button>
    </div>
  );
};

export default StartScreen;
