import React, { useEffect, useState } from 'react';
import './Main.scss';
import Button from '../../components/Button/Button';
import Alert from '../../components/Alert/Alert';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Calculator = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(0);
  const [operatorCheck, setOperatorCheck] = useState(true);
  const [controllWon, setControllWon] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showMoney, setShowMoney] = useState(false);

  const controllAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const clickMoneyBtn = () => {
    setShowMoney(true);
  };

  const getNumber = (num) => {
    if (result === 0 || result === '숫자 아님' || result === 'Infinity') {
      setResult('');
    }
    if (number.length >= 10) {
      controllAlert('최대 10자리 숫자만 입력 가능합니다');
      return;
    }
    setNumber((prev) => prev + num.target.value);
    setResult((prev) => prev + num.target.value);
    setOperatorCheck(true);
    setControllWon(true);
  };

  const getOperator = (operator) => {
    if (operatorCheck) {
      setNumber('');
      setResult((prev) => prev + operator.target.value);
    }
    setControllWon(true);
  };

  const deleteOne = () => {
    let sliceResult = String(result).slice(0, -1);
    let sliceNumber = String(number).slice(0, -1);

    setResult(sliceResult);
    setNumber(sliceNumber);
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
      controllAlert('올바른 형식을 지켜주세요');
      return;
    } else {
      let replaceDivideString = result.replace(/÷/gi, '/');

      if (
        isNaN(eval(replaceDivideString)) ||
        eval(replaceDivideString) === Infinity
      ) {
        setResult('숫자 아님');
        setControllWon(false);
        setNumber('');
        return false;
      } else if (Math.floor(eval(replaceDivideString)) < 0) {
        controllAlert('세뱃돈이 없어요!');
        setResult(0);
        setNumber('');
        return;
      } else if (String(Math.floor(eval(replaceDivideString))).length > 10) {
        setResult('Infinity');
        setControllWon(false);
      } else {
        setResult(Math.floor(eval(replaceDivideString)));
        setNumber(Math.floor(eval(replaceDivideString)));
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
    <>
      {showAlert && (
        <Alert
          message={alertMessage}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
      <div
        className={
          showAlert ? 'calculatorContainer behind' : 'calculatorContainer'
        }
      >
        <div className={controllWon ? 'resultScreen' : 'resultScreen isError'}>
          {result}
          {controllWon ? <span className='won'>원</span> : ''}
        </div>
        <div className='calButtons'>
          {buttonTypes.map((button) => {
            return (
              <Button
                key={button.name}
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
          {!showMoney ? (
            <Button
              name={<FontAwesomeIcon icon={faMoneyBillWave} color='#6c7062' />}
              className='money Btn'
              functionName={clickMoneyBtn}
            />
          ) : (
            <div className='moneyBtnOn'>
              {moneyButton.map((money) => {
                return (
                  <Button
                    key={money}
                    name={money}
                    className='moneys'
                    functionName={getNumber}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;

const buttonTypes = [
  { name: 'AC', class: 'op Btn', type: 'ac' },
  { name: 'C', class: 'op Btn', type: 'c' },
  { name: '+', class: 'op Btn', type: 'oper' },
  { name: '-', class: 'op Btn', type: 'oper' },
  { name: 7, class: 'num Btn', type: 'numb' },
  { name: 8, class: 'num Btn', type: 'numb' },
  { name: 9, class: 'num Btn', type: 'numb' },
  { name: '*', class: 'op Btn', type: 'oper' },
  { name: 4, class: 'num Btn', type: 'numb' },
  { name: 5, class: 'num Btn', type: 'numb' },
  { name: 6, class: 'num Btn', type: 'numb' },
  { name: '÷', class: 'op Btn', type: 'oper' },
  { name: 1, class: 'num Btn', type: 'numb' },
  { name: 2, class: 'num Btn', type: 'numb' },
  { name: 3, class: 'num Btn', type: 'numb' },
  { name: '=', class: 'op Btn' },
  { name: 0, class: 'xLong num Btn', type: 'numb' },
  { name: '00', class: 'num Btn', type: 'numb' },
];

const moneyButton = [10000, 50000, 100000];
