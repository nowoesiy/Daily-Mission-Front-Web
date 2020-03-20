import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faSmileWink,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
const SubmitPopup = ({
  m,
  title,
  content,
  updateTitleValue,
  updateContentValue,
  postBoard,
  fileName,
  fileImgUrl,
  file,
  closeModel,
}) => {
  return (
    <Popup
      modal
      closeOnDocumentClick
      open={fileName}
      trigger={
        !m.submit ? (
          <div className="drop-upload-box__wrap">
            <FontAwesomeIcon icon={faUpload} size="2x" />
            <span className="drop-upload-box__title">
              미션 사진을 DRAG 해주세요!
            </span>
          </div>
        ) : (
          <div className="drop-upload-box__wrap--submit">
            {/* <FontAwesomeIcon icon={faSmileWink} size="2x" /> */}
            <span className="drop-upload-box__title">
              😊 오늘 하루도 수고하셨습니다!!!
            </span>
          </div>
        )
      }
    >
      {close => (
        <div className="submit-board">
          <a
            className="submit-board__cancel-button"
            onClick={() => {
              close();
              closeModel();
            }}
          >
            ×
          </a>
          <div className="submit-board__title">
            <input
              className="submit-board__board-title-input"
              name="title"
              type="text"
              placeholder="제목"
              autocomplete="off"
              value={title}
              onChange={updateTitleValue}
            />
          </div>
          <hr />
          <div className="submit-board__contents">
            <textarea
              className="submit-board__contents-input"
              name="content"
              cols="40"
              rows="13"
              placeholder="글 써주실꺼죠? :)"
              value={content}
              onChange={updateContentValue}
            ></textarea>
          </div>
          <hr />
          <div className="submit-board__img-box">
            <img
              className="submit-board__img"
              src={fileImgUrl}
              alt={fileName}
            />
          </div>
          <button
            type="button"
            className="submit-board__button submit-board__button--submit"
            onClick={() => {
              postBoard(m.id, title, content, file);
              close();
              alert('제출성공');
            }}
          >
            <FontAwesomeIcon icon={faCheck} size="1x" /> 미션제출
          </button>
        </div>
      )}
    </Popup>
  );
};

// const mapStateToProps = state => ({
//   title: state.submitpost.titleValue,
//   content: state.submitpost.contentValue,
// });

// // const mapDispatchToProps = dispatch => ({
// //   updateTitleValue: () => {
// //     dispatch(updateTitleValue());
// //   },
// //   updateContentValue: () => {
// //     dispatch(updateContentValue());
// //   },
// // });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       updateTitleValue,
//       updateContentValue,
//     },
//     dispatch,
//   );

export default SubmitPopup;
