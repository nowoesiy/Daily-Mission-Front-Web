import React from 'react';
import SubmitPopup from '../SubmitPopup';
import './index.scss';
import FileDrop from 'react-file-drop';

class Submit extends React.Component {
  state = {
    file: '',
    fileImgUrl: '',
    submit: true,
  };

  handleDrop = (files, event) => {
    console.log(files);
    this.setState({
      file: files[0].name,
      fileImgUrl: URL.createObjectURL(files[0]),
    });
  };

  CreateSubmitBox = ({
    inputValue,
    inputValue2,
    PostBoard,
    updateInputValue,
    file,
    submit,
    fileImgUrl,
  }) => {
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
                  inputValue={inputValue}
                  inputValue2={inputValue2}
                  updateInputValue={updateInputValue}
                  PostBoard={PostBoard}
                  file={file}
                  submit={submit}
                  fileImgUrl={fileImgUrl}
                />
              </FileDrop>
            </div>
            {/* <h3>제출</h3>
            {team.map(t => {
              return (
                <div className="box__profile">
                  <div className="profile">
                    <img className="profile__img" alt={t.id} src={t.img}></img>
                    {<span className="profile__title">{t.id}</span>}
                    <Popup
                      modal
                      trigger={
                        <span className="profile__title">{posts.title}</span>
                      }
                    >
                      <div className="boardModalBox">
                        <h2>게시글</h2>
                        <div className="boardModalBody">
                          <div className="boardTitle">
                            <h3>제목</h3>
                            <input type="text" value={posts.title} />
                          </div>
                          <div className="boardContents">
                            <h3>내용</h3>
                            <textarea
                              cols="40"
                              rows="5"
                              value={posts.content}
                            ></textarea>
                          </div>
                          <button>수정</button>
                          <button onClick={DeleteBoard}>삭제</button>
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      team,
      posts,
      inputValue,
      PostBoard,
      updateInputValue,
      DeleteBoard,
    } = this.props;

    const { file, submit, fileImgUrl } = this.state;
    return (
      <div className="submit">
        <div className="submit__title">
          <h1 className="submit__title-who">'수박' 님의 미션</h1>
        </div>
        <div className="submit__contents">
          <this.CreateSubmitBox
            team={team}
            posts={posts}
            inputValue={inputValue}
            updateInputValue={updateInputValue}
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

export default Submit;
