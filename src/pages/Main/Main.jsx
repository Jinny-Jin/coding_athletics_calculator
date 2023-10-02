import React, { useState } from 'react';
import './Main.scss';

const Calculator = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(0);

  const getNumber = (e) => {
    if (result === 0) {
      setResult('');
    }
    if (number.length >= 10) {
      alert('최대 10자리 숫자만 입력 가능합니다');
      return;
    }
    setNumber((prev) => prev + e.target.value);
    setResult((prev) => prev + e.target.value);
  };

  const getOperator = (e) => {
    setNumber('');
    setResult((prev) => prev + e.target.value);
  };

  const getResult = () => {
    let replaceDivideString = result.replace(/÷/gi, '/');
    const resultLength = String(eval(replaceDivideString)).length;

    if (isNaN(eval(replaceDivideString))) {
      setResult('');
    } else if (eval(replaceDivideString) === Infinity) {
      setResult('숫자 아님');
      return false;
    } else if (resultLength > 10) {
      setResult('Infinity');
    } else {
      setResult((prev) => eval(replaceDivideString));
    }
  };

  const deleteOne = () => {
    let sliceResult = String(result).slice(0, -1);

    setResult((prev) => sliceResult);
    if (String(result).length <= 1) {
      setResult(0);
    }
  };

  const deleteAll = () => {
    setResult(0);
  };

  console.log('@', number);

  return (
    <div className='calculatorContainer'>
      <div className='resultScreen'>
        {result}
        <span>원</span>
      </div>
      <div className='calButtons'>
        <button className='sm Btn' onClick={deleteAll}>
          AC
        </button>
        <button className='sm Btn' onClick={deleteOne}>
          C
        </button>
        <button className='sm Btn' value='+' onClick={getOperator}>
          +
        </button>
        <button className='sm Btn' value='-' onClick={getOperator}>
          -
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
        <button className='sm Btn' value='*' onClick={getOperator}>
          *
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
        <button className='sm Btn' value='÷' onClick={getOperator}>
          ÷
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
        <button className='sm Btn' onClick={getResult}>
          =
        </button>

        <button className='xLong Btn' value={0} onClick={getNumber}>
          0
        </button>
        <button className='sm Btn' value='00' onClick={getNumber}>
          00
        </button>
        <div className='sm Btn'></div>
      </div>
    </div>
  );
};

export default Calculator;
