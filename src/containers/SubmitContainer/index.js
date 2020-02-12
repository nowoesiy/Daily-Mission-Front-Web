import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubmitPopup from '../../components/SubmitPopup';
import './index.scss';
import {
  updateTitleValue,
  updateContentValue,
  postBoard,
  handleDrop,
} from '../../modules/reducer_submitPost';
import FileDrop from 'react-file-drop';

class Submit extends React.Component {
  CreateSubmitBox = ({
    title,
    content,
    updateTitleValue,
    updateContentValue,
    handleDrop,
    postBoard,
    fileName,
    submit,
    fileImgUrl,
  }) => {
    return (
      <div className="submit__box">
        <div className={`box ${submit ? 'box--submit' : ''}`}>
          <div className={`box__top ${submit ? 'box__top--submit' : ''}`}>
            <h2 className="box__title">1일 1알고리즘 미션</h2>
          </div>
          <div className="box__body">
            <div className="drop-upload-box">
              <FileDrop onDrop={handleDrop}>
                <SubmitPopup
                  title={title}
                  content={content}
                  updateTitleValue={updateTitleValue}
                  updateContentValue={updateContentValue}
                  postBoard={postBoard}
                  fileName={fileName}
                  fileImgUrl={fileImgUrl}
                  submit={submit}
                />
              </FileDrop>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      title,
      content,
      fileName,
      fileImgUrl,
      submit,
      updateTitleValue,
      updateContentValue,
      handleDrop,
      postBoard,
      DeleteBoard,
    } = this.props;

    return (
      <div className="submit">
        <div className="submit__title">
          <h1 className="submit__title-who">'수박' 님의 미션 😎</h1>
        </div>
        <div className="submit__contents">
          <this.CreateSubmitBox
            title={title}
            content={content}
            updateTitleValue={updateTitleValue}
            updateContentValue={updateContentValue}
            fileName={fileName}
            fileImgUrl={fileImgUrl}
            submit={submit}
            handleDrop={handleDrop}
            postBoard={postBoard}
            DeleteBoard={DeleteBoard}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    title: state.submitpost.titleValue,
    content: state.submitpost.contentValue,
    fileName: state.submitpost.fileName,
    fileImgUrl: state.submitpost.fileImgUrl,
    submit: state.submitpost.submit,
  }),
  // {
  //   updateTitleValue,
  //   updateContentValue,
  //   postBoard,
  //   handleDrop,
  // },
  dispatch => ({
    updateTitleValue: bindActionCreators(updateTitleValue, dispatch),
    updateContentValue: bindActionCreators(updateContentValue, dispatch),
    postBoard: bindActionCreators(postBoard, dispatch),
    handleDrop: bindActionCreators(handleDrop, dispatch),
  }),
)(Submit);
