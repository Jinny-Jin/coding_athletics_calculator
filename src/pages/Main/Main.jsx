import React, { useEffect, useState } from 'react';
import './Main.scss';
import Button from '../../components/Button';

const Calculator = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(0);
  const [operatorCheck, setOperatorCheck] = useState(false);

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
    setOperatorCheck(true);
  };

  const getOperator = (e) => {
    if (operatorCheck) {
      setNumber('');
      setResult((prev) => prev + e.target.value);
    }
  };

  const getResult = () => {
    if (!operatorCheck || !/[+\-*\/÷]/.test(result)) {
      alert('올바른 형식을 지켜주세요');
      return;
    } else {
      let replaceDivideString = result.replace(/÷/gi, '/');

      if (
        isNaN(eval(replaceDivideString)) ||
        eval(replaceDivideString) === Infinity
      ) {
        setResult('숫자 아님');
        return false;
      } else if (parseInt(eval(replaceDivideString)) < 0) {
        alert('세뱃돈이 없어요!');
        setResult(0);
        return;
      } else if (String(parseInt(eval(replaceDivideString))).length > 10) {
        setResult('Infinity');
      } else {
        setResult((prev) => parseInt(eval(replaceDivideString)));
      }
    }
  };

  const deleteOne = () => {
    let sliceResult = String(result).slice(0, -1);
    let sliceNumber = String(number).slice(0, -1);

    setResult((prev) => sliceResult);
    setNumber((prev) => sliceNumber);
    if (String(result).length <= 1) {
      setResult(0);
    }
  };

  const deleteAll = () => {
    setResult(0);
    setNumber('');
    setOperatorCheck(false);
  };

  useEffect(() => {
    const lastString = result[result.length - 1];

    if (/[+\-*\/÷]/.test(lastString)) {
      setOperatorCheck(false);
    }
  }, [result]);

  return (
    <div className='calculatorContainer'>
      <div className='resultScreen'>
        {result}
        <span>원</span>
      </div>{' '}
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
