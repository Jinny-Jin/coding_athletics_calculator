import React, { useEffect, useRef } from 'react';
import './Alert.scss';
import { faAngry } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <FontAwesomeIcon icon={faAngry} color='red' size='lg' />
      {message}
      <button onClick={closeAlert} className='okBtn'>
        확인
      </button>
    </div>
  );
};

export default Alert;
