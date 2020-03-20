import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class SubmitPopup extends React.Component {
  state = {
    title: '',
    content: '',
  };

  handleUpdateValue = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { id, postBoard, file, handlePopUp, handleClickFile } = this.props;
    const { title, content } = this.state;
    return (
      <div className="overlay">
        <div className="submit-board">
          <a className="submit-board__cancel-button" onClick={handlePopUp}>
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
              onChange={this.handleUpdateValue}
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
              onChange={this.handleUpdateValue}
            ></textarea>
          </div>
          <hr />
          <div className="submit-board__img-box">
            <input
              className="submit-board__img-upload"
              id="img-upload"
              type="file"
              onChange={handleClickFile}
            />
            {file ? (
              <label for="img-upload">
                <img
                  className="submit-board__img"
                  src={window.URL.createObjectURL(file)}
                  alt={file.name}
                />
              </label>
            ) : (
              <div className="submit-board__img">
                <label for="img-upload">
                  <div className="submit-board__img-des">📷 사진 업로드</div>
                </label>
              </div>
            )}
          </div>
          <button
            type="button"
            className="submit-board__button submit-board__button--submit"
            onClick={() => {
              postBoard(id, title, content, file);
              handlePopUp();
            }}
          >
            <FontAwesomeIcon icon={faCheck} size="1x" /> 미션제출
          </button>
        </div>
      </div>
    );
  }
}

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
