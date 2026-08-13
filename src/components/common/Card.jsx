import React from 'react';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/30' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
