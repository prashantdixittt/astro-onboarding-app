import React from 'react';

const Loader = ({ isVisible, message = "Processing your response..." }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      {/* Spinner Animation */}
      <div style={{
        width: '80px',
        height: '80px',
        border: '4px solid rgba(249, 115, 22, 0.2)',
        borderTop: '4px solid #f97316',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '30px'
      }} />
      
      {/* Loading Message */}
      <div style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: '1.5'
      }}>
        {message}
      </div>
      
      {/* Subtitle */}
      <div style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        marginTop: '10px',
        textAlign: 'center'
      }}>
        Please wait while we analyze your response...
      </div>
      
    </div>
  );
};

export default Loader;
