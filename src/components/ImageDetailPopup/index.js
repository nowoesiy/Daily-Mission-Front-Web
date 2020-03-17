import React from 'react';
import './index.scss';
const ImageDetailPopup = ({ activePostImg, handleClickImage }) => {
  return (
    <div className="overlay">
      <div className="imgae-detail">
        <img
          src={activePostImg}
          className="image-detail__img"
          onClick={() => {
            handleClickImage('');
          }}
        />
      </div>
    </div>
  );
};

export default ImageDetailPopup;
