import React from 'react';
import './index.scss';
const ImageDetailPopup = ({ activePostImg, handleClickImage }) => {
  return (
    <div className="overlay">
      <div className="image-detail">
        <a
          className="image-detail__cancel-button"
          onClick={() => {
            handleClickImage();
          }}
          href
        >
          ×
        </a>
        <img
          src={activePostImg}
          className="image-detail__img"
          onClick={() => {
            handleClickImage();
          }}
        />
      </div>
    </div>
  );
};

export default ImageDetailPopup;
