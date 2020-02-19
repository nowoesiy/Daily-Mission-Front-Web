import React from 'react';
import { connect } from 'react-redux';
import SubmitPopup from '../../components/SubmitPopup';
import './index.scss';
import {
  updateTitleValue,
  updateContentValue,
  postBoard,
  handleDrop,
} from '../../modules/reducer_submitPost';
import { Link } from 'react-router-dom';
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

  CreateMissionBox = () => {
    return (
      <div className="mission-attend">
        <div className="mission-attend__text">미션을 추가해 주세요 !</div>

        <div className="mission-attend__mission-go">
          <Link to={'/mission'}>+</Link>
        </div>
      </div>
    );
  };

  render() {
    const {
      currentUser,
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
    const mission = false;
    return (
      <div className="submit">
        <div className="submit__title">
          <h1 className="submit__title-who">
            {currentUser
              ? `'${currentUser.name}'님의 미션😎`
              : '미션이 없네요😢 '}
          </h1>
        </div>
        <div className="submit__contents">
          {mission ? (
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
          ) : (
            <this.CreateMissionBox />
          )}
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
  {
    updateTitleValue,
    updateContentValue,
    postBoard,
    handleDrop,
  },
  // dispatch => ({
  //   updateTitleValue: bindActionCreators(updateTitleValue, dispatch),
  //   updateContentValue: bindActionCreators(updateContentValue, dispatch),
  //   postBoard: bindActionCreators(postBoard, dispatch),
  //   handleDrop: bindActionCreators(handleDrop, dispatch),
  // }),
)(Submit);
