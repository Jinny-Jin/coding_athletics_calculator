import React, { useState } from 'react';
import './Main.scss';

const Calculator = () => {
  const [result, setResult] = useState(50);

  return (
    <div className='calculatorContainer'>
      <div className='resultScreen'>{result}</div>
      <div className='calButtons'>
        <button className='smBtn'>+</button>
        <button className='smBtn'>-</button>
        <button className='smBtn'>*</button>
        <button className='smBtn'>/</button>
      </div>
    </div>
  );
};

export default Calculator;
