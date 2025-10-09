import React from 'react';

const ThankYou = ({ onRestart }) => {
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
            Your responses have been successfully submitted. Our team will review your assessment and reach out to you soon with the results and next steps.
          </p>
        </div>

      </div>

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
