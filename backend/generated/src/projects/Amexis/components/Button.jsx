import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={
        'inline-block px-6 py-2 rounded-lg text-white font-bold' +
        ' ' +
        (className || '')
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;