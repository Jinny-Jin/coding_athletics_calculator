import React, { useEffect, useState } from 'react';
import './Main.scss';
import Button from '../../components/Button/Button';

const Calculator = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(0);
  const [operatorCheck, setOperatorCheck] = useState(true);
  const [controllWon, setControllWon] = useState(true);

  const getNumber = (e) => {
    if (result === 0 || result === '숫자 아님' || result === 'Infinity') {
      setResult('');
    }
    if (number.length >= 10) {
      alert('최대 10자리 숫자만 입력 가능합니다');
      return;
    }
    setNumber((prev) => prev + e.target.value);
    setResult((prev) => prev + e.target.value);
    setOperatorCheck(true);
    setControllWon(true);
  };

  const getOperator = (e) => {
    if (operatorCheck) {
      setNumber('');
      setResult((prev) => prev + e.target.value);
    }
    setControllWon(true);
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
    setControllWon(true);
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
        setControllWon(false);
        return false;
      } else if (parseInt(eval(replaceDivideString)) < 0) {
        alert('세뱃돈이 없어요!');
        setResult(0);
        return;
      } else if (String(parseInt(eval(replaceDivideString))).length > 10) {
        setResult('Infinity');
        setControllWon(false);
      } else {
        setResult((prev) => parseInt(eval(replaceDivideString)));
      }
    }
  };

  useEffect(() => {
    const lastString = result[result.length - 1];

    if (/[+\-*\/÷]/.test(lastString)) {
      setOperatorCheck(false);
    }
  }, [result]);

  return (
    <div className='calculatorContainer'>
      <div className={controllWon ? 'resultScreen' : 'resultScreen isError'}>
        {result}
        {controllWon ? <span className='won'>원</span> : ''}
      </div>
      <div className='calButtons'>
        {buttonTypes.map((button) => {
          return (
            <Button
              key={button.id}
              name={button.name}
              className={button.class}
              functionName={
                button.type === 'numb'
                  ? getNumber
                  : button.type === 'oper'
                  ? getOperator
                  : button.type === 'ac'
                  ? deleteAll
                  : button.type === 'c'
                  ? deleteOne
                  : getResult
              }
            />
          );
        })}
        <div className='empty'></div>
      </div>
    </div>
  );
};

export default Calculator;

const buttonTypes = [
  { id: 0, name: 'AC', class: 'sm op Btn', type: 'ac' },
  { id: 1, name: 'C', class: 'sm op Btn', type: 'c' },
  { id: 2, name: '+', class: 'sm op Btn', type: 'oper' },
  { id: 3, name: '-', class: 'sm op Btn', type: 'oper' },
  { id: 4, name: 7, class: 'sm num Btn', type: 'numb' },
  { id: 5, name: 8, class: 'sm num Btn', type: 'numb' },
  { id: 6, name: 9, class: 'sm num Btn', type: 'numb' },
  { id: 7, name: '*', class: 'sm op Btn', type: 'oper' },
  { id: 8, name: 4, class: 'sm num Btn', type: 'numb' },
  { id: 9, name: 5, class: 'sm num Btn', type: 'numb' },
  { id: 10, name: 6, class: 'sm num Btn', type: 'numb' },
  { id: 11, name: '÷', class: 'sm op Btn', type: 'oper' },
  { id: 12, name: 1, class: 'sm num Btn', type: 'numb' },
  { id: 13, name: 2, class: 'sm num Btn', type: 'numb' },
  { id: 14, name: 3, class: 'sm num Btn', type: 'numb' },
  { id: 15, name: '=', class: 'sm op Btn' },
  { id: 16, name: 0, class: 'xLong num Btn', type: 'numb' },
  { id: 17, name: '00', class: 'sm num Btn', type: 'numb' },
];
