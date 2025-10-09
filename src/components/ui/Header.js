import React from 'react';
import Logo from './Logo';

const Header = ({ currentStep, onNext, onBack, isProcessing, isDisabled, mcqState }) => {
  const getButtonConfig = () => {
    switch (currentStep) {
      case 'basicInfo':
        return {
          label: 'Next',
          show: true,
          disabled: isDisabled || false
        };
      case 'prerequisites':
        return {
          label: 'Start Assessment',
          show: true,
          disabled: isDisabled || false
        };
      case 'mcq':
        return {
          label: mcqState?.isSubmitting ? 'Submitting...' : 'Next',
          show: true,
          disabled: isDisabled || mcqState?.isSubmitting || false
        };
      case 'knowledge':
        return {
          label: isProcessing ? 'Evaluating...' : 'Next',
          show: true,
          disabled: isDisabled || isProcessing
        };
      case 'communication':
        return {
          label: isProcessing ? 'Processing...' : 'Submit',
          show: true,
          disabled: isDisabled || isProcessing
        };
      default:
        return {
          label: '',
          show: false,
          disabled: false
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e2e8f0',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Logo and App Name */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <Logo size={45} />
        <h1 style={{
          margin: 0,
          fontSize: '1.5rem',
          background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 'bold'
        }}>
          AstroLokal
        </h1>
      </div>

      {/* Action Button */}
      {buttonConfig.show && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          {/* Back Button (for applicable screens) */}
          {currentStep === 'prerequisites' && (
            <button
              onClick={onBack}
              style={{
                background: 'transparent',
                color: '#64748b',
                padding: '8px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#ea580c';
                e.target.style.color = '#ea580c';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.color = '#64748b';
              }}
            >
              ← Back
            </button>
          )}

          {/* Main Action Button */}
          <button
            onClick={onNext}
            disabled={buttonConfig.disabled}
            style={{
              background: buttonConfig.disabled 
                ? 'linear-gradient(135deg, #9ca3af, #d1d5db, #e5e7eb)' 
                : 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
              color: buttonConfig.disabled ? '#000000' : 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: buttonConfig.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: buttonConfig.disabled ? 0.8 : 1,
              boxShadow: buttonConfig.disabled 
                ? '0 2px 8px rgba(156, 163, 175, 0.3)' 
                : '0 2px 8px rgba(249, 115, 22, 0.3)'
            }}
            onMouseOver={(e) => {
              if (!buttonConfig.disabled) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!buttonConfig.disabled) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(249, 115, 22, 0.3)';
              }
            }}
          >
            {buttonConfig.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
