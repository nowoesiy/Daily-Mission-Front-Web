import React from 'react';
import { connect } from 'react-redux';

import SubmitPopup from '../SubmitPopup';
import './index.scss';
import FileDrop from 'react-file-drop';

class Submit extends React.Component {
  state = {
    file: '',
    fileImgUrl: '',
    submit: false,
  };

  handleDrop = (files, event) => {
    console.log(files);
    this.setState({
      file: files[0].name,
      fileImgUrl: URL.createObjectURL(files[0]),
    });
  };

  CreateSubmitBox = ({ PostBoard, file, submit, fileImgUrl }) => {
    return (
      <div className="submit__box">
        <div className={`box ${this.state.submit ? 'box--submit' : ''}`}>
          <div
            className={`box__top ${
              this.state.submit ? 'box__top--submit' : ''
            }`}
          >
            <h2 className="box__title">1일 1알고리즘 미션</h2>
          </div>
          <div className="box__body">
            <div className="drop-upload-box">
              <FileDrop onDrop={this.handleDrop}>
                <SubmitPopup
                  PostBoard={PostBoard}
                  file={file}
                  submit={submit}
                  fileImgUrl={fileImgUrl}
                />
              </FileDrop>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { team, PostBoard, DeleteBoard } = this.props;

    const { file, submit, fileImgUrl } = this.state;
    return (
      <div className="submit">
        <div className="submit__title">
          <h1 className="submit__title-who">'수박' 님의 미션 😎</h1>
        </div>
        <div className="submit__contents">
          <this.CreateSubmitBox
            team={team}
            PostBoard={PostBoard}
            DeleteBoard={DeleteBoard}
            file={file}
            submit={submit}
            fileImgUrl={fileImgUrl}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(Submit);
