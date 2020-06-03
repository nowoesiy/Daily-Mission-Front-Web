import React from 'react';
import './index.scss';

const Alert = ({ title, text, func }) => {
  return (
    <div className="alert__wrap">
      <div className="alert__top">
        <div className="alert__title">{title}</div>
      </div>
      <div className="alert__middle">
        <div className="alert__text">{text}</div>
      </div>
      <div className="alert__bottom">
        {/* <button className="alert__button alert__button--cancel">취소</button> */}
        <button className="alert__button alert__button--confirm" onClick={func}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
