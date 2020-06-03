import React from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonComponent = ({ icon, func, disabled }) => {
  return (
    <div className="card-nav__button-wrap">
      <button
        className={`${
          disabled
            ? 'card-nav__button card-nav__button--disabled'
            : 'card-nav__button'
        }`}
        onClick={func}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
};

export default ButtonComponent;
