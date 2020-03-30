import React from 'react';
import './index.scss';

const Alert = text => {
  return (
    <div className="alert__wrap">
      <div className="alert__top">
        <div className="alert__text">{text}</div>
      </div>
      <div className="alert__bottom">
        <button className="alert__button--cancel">���</button>
        <button className="alert__button--confirm">Ȯ��</button>
      </div>
    </div>
  );
};

export default Alert;
