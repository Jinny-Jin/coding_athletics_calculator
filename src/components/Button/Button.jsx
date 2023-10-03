import React from 'react';
import './Button.scss';

const Button = ({ name, className, functionName }) => {
  return (
    <button className={className} onClick={functionName} value={name}>
      {name}
    </button>
  );
};

export default Button;
