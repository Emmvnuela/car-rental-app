import React from 'react';

function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '6px',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      {message}
    </div>
  );
}

export default Toast;
