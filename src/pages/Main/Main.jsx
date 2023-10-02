import React, { useState } from 'react';
import './Main.scss';

const Calculator = () => {
  const [result, setResult] = useState(0);

  const getNumber = (e) => {
    if (result === 0) {
      setResult('');
    }
    setResult((prev) => prev + e.target.value);
  };

  const getOperator = (e) => {
    setResult((prev) => prev + e.target.value);
  };

  const getResult = () => {
    const resultLength = String(eval(result)).length;

    if (isNaN(eval(result))) {
      setResult('');
    } else if (eval(result) === Infinity) {
      alert('0으로 나눌 수 없습니다');
      setResult('');
      return false;
    } else if (resultLength > 10) {
      setResult('Infinity');
    } else {
      setResult((prev) => eval(result));
    }
  };

  const deleteAll = () => {
    setResult(0);
  };

  console.log(result);

  return (
    <div className='calculatorContainer'>
      <div className='resultScreen'>{result}</div>
      <div className='calButtons'>
        <button className='sm Btn' onClick={deleteAll}>
          AC
        </button>
        <button className='sm Btn'>C</button>
        <button className='sm Btn'>.</button>
        <button className='sm Btn' value='+' onClick={getOperator}>
          +
        </button>
        <button className='sm Btn' value={7} onClick={getNumber}>
          7
        </button>
        <button className='sm Btn' value={8} onClick={getNumber}>
          8
        </button>
        <button className='sm Btn' value={9} onClick={getNumber}>
          9
        </button>
        <button className='sm Btn' value='-' onClick={getOperator}>
          -
        </button>
        <button className='sm Btn' value={4} onClick={getNumber}>
          4
        </button>
        <button className='sm Btn' value={5} onClick={getNumber}>
          5
        </button>
        <button className='sm Btn' value={6} onClick={getNumber}>
          6
        </button>
        <button className='sm Btn' value='*' onClick={getOperator}>
          *
        </button>
        <button className='sm Btn' value={1} onClick={getNumber}>
          1
        </button>
        <button className='sm Btn' value={2} onClick={getNumber}>
          2
        </button>
        <button className='sm Btn' value={3} onClick={getNumber}>
          3
        </button>
        <button className='sm Btn' value='/' onClick={getOperator}>
          ÷
        </button>
        <button className='xLong Btn' value={0} onClick={getNumber}>
          0
        </button>
        <button className='xLong Btn' onClick={getResult}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
