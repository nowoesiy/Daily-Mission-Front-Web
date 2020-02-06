import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const SubmitPopup = ({
  inputValue,
  inputValue2,
  updateInputValue,
  PostBoard,
  file,
}) => {
  return (
    <Popup
      modal
      open={file}
      trigger={
        <div>
          <FontAwesomeIcon icon={faUpload} size="2x" />
          <span className="drop-upload-box__title">미션 업로드 !</span>
        </div>
      }
    >
      <div className="submit-board-box">
        <h2 className="submit-board-box__main-title">게시글 등록</h2>
        <div className="submit-board-box__submit-board">
          <div className="submit-board">
            <div className="submit-board__title">
              <h3 className="submit-board__board-title">제목</h3>
              <input
                className="submit-board__board-title-input"
                name="title"
                type="text"
                value={inputValue}
                onChange={updateInputValue}
              />
            </div>
            <div className="submit-board__author">
              <h3 className="submit-board__author-title">저자</h3>
              <input
                className="submit-board__author-input"
                id="author"
                name="author"
                value="이수백"
                type="text"
              ></input>
            </div>
            <div className="submit-board__contents">
              <h3 className="submit-board__contents-title">내용</h3>
              <textarea
                className="submit-board__contents-input"
                name="content"
                cols="40"
                rows="5"
                value={inputValue2}
                onChange={updateInputValue}
              ></textarea>
            </div>
            <div className="submit-board__contents">
              <h3 className="submit-board__contents-title">파일</h3>
              {file}
            </div>
            <button type="submit-board__cancel-button" onClick={PostBoard}>
              취소
            </button>
            <button type="submit-board__submit-button" onClick={PostBoard}>
              등록
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SubmitPopup;
