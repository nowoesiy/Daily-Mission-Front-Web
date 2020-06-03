import React from 'react';
import './index.scss';
const ImageDetailPopup = ({ activePostImg, handleClose }) => {
  return (
    <div className="image-detail">
      <span className="image-detail__cancel-button">×</span>
      <img
        src={activePostImg}
        className="image-detail__img"
        alt={activePostImg}
      />
      <div className="overlay" onClick={handleClose}></div>
    </div>
  );
};

export default ImageDetailPopup;
