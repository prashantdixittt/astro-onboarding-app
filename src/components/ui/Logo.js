import React from 'react';
import logoImage from '../../assets/app_icon.png';

const Logo = ({ size = 64, className = '', style = {}, showText = false, ...props }) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        ...style,
      }}
      {...props}
    >
      {/* AstroLokal Logo Image */}
      <img
        src={logoImage}
        alt="AstroLokal Logo"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: '20px',
          filter: 'drop-shadow(0 8px 16px rgba(249, 115, 22, 0.3))',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1) rotate(5deg)';
          e.target.style.filter = 'drop-shadow(0 12px 24px rgba(249, 115, 22, 0.5))';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1) rotate(0deg)';
          e.target.style.filter = 'drop-shadow(0 8px 16px rgba(249, 115, 22, 0.3))';
        }}
      />
      
      {/* Optional text below logo */}
      {showText && (
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#0f172a',
          textAlign: 'center',
        }}>
          AstroLokal
        </div>
      )}
    </div>
  );
};

export default Logo;
