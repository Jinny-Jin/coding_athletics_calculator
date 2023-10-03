import React, { useEffect, useRef } from 'react';
import './Alert.scss';

const Alert = ({ message, showAlert, setShowAlert }) => {
  const alertRef = useRef(null);

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const closeAlert = (e) => {
      if (
        showAlert &&
        alertRef.current &&
        !alertRef.current.contains(e.target)
      ) {
        setShowAlert(false);
      }
    };
    document.addEventListener('mousedown', closeAlert);

    return () => {
      document.removeEventListener('mousedown', closeAlert);
    };
  }, [showAlert]);

  return (
    <div className='alertScreen' ref={alertRef}>
      {message}
      <button onClick={closeAlert} className='okBtn'>
        확인
      </button>
    </div>
  );
};

export default Alert;
