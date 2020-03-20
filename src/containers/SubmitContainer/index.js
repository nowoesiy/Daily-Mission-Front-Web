import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SubmitPopup from '../../components/SubmitPopup';
import './index.scss';
import {
  updateTitleValue,
  updateContentValue,
  postBoard,
  handleDrop,
} from '../../modules/reducer_submitPost';
import { withRouter, Link } from 'react-router-dom';
import FileDrop from 'react-file-drop';
import { closeModel } from '../../modules/reducer_submitPost';

// const dayInfo = [
//   { date: '2020-03-01', day: '일' },
//   { date: '2020-03-02', day: '월' },
//   { date: '2020-03-03', day: '화' },
//   { date: '2020-03-04', day: '수' },
//   { date: '2020-03-05', day: '목' },
//   { date: '2020-03-06', day: '금' },
//   { date: '2020-03-07', day: '토' },
// ];
// const usersOfTeam = [
//   {
//     userId: 2,
//     userName: 'seowon lee',
//     banned: false,
//     imgUrl:
//       'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
//     submitDay: ['2020-03-07', '2020-03-06', '2020-03-01'],
//   },
//   {
//     userId: 3,
//     userName: 'Mino DR.',
//     banned: false,
//     imgUrl:
//       'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
//     submitDay: ['2020-03-05', '2020-03-09', '2020-03-10'],
//   },
//   {
//     userId: 5,
//     userName: '이민호',
//     banned: false,
//     imgUrl:
//       'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
//     submitDay: ['2020-03-07', '2020-03-06', '2020-03-05'],
//   },
// ];

class Submit extends React.Component {
  state = {
    activeMissionId: '',
    dates: [],
    histories: [],
    activeMyMission: '',
  };

  CreateSubmitBox = ({
    m,
    title,
    content,
    updateTitleValue,
    updateContentValue,
    handleDrop,
    postBoard,
    fileName,
    file,
    fileImgUrl,
    closeModel,
  }) => {
    return (
      <div className="submit__box">
        <div className={`box ${m.submit ? 'box--submit' : ''}`}>
          <div className={`box__top ${m.submit ? 'box__top--submit' : ''}`}>
            <h2 className="box__title">제출 보드</h2>
          </div>
          <div className="box__body">
            <div className="box__limit-time">⏰ 03:00:33 남음</div>
            <div className="drop-upload-box">
              <FileDrop onDrop={handleDrop}>
                <SubmitPopup
                  m={m}
                  title={title}
                  content={content}
                  updateTitleValue={updateTitleValue}
                  updateContentValue={updateContentValue}
                  postBoard={postBoard}
                  fileName={fileName}
                  fileImgUrl={fileImgUrl}
                  file={file}
                  closeModel={closeModel}
                />
              </FileDrop>
            </div>
          </div>
        </div>
      </div>
    );
  };

  CreateSubmitDetailBox = () => {
    const { activeMyMission, histories, weekDates } = this.state;

    return (
      <div className="submit-detail__box">
        <div className="detail-box">
          <div className="detail-box__title">
            <span>제출 정보</span>
            {/* <div className="detail-box__nav-wrap">
              <button className="detail-box__nav-button">◀</button>
              <button className="detail-box__nav-button">▶</button>
            </div> */}
          </div>
          <div className="day-info">
            <span className="day-info__title">
              {weekDates
                ? weekDates.map(d => {
                    return (
                      <>
                        <span className="day-info__day">
                          {d.day.substr(0, 3)}
                        </span>
                        <sub className="day-info__title--sub">
                          {/* d.date.substr(5).replace('-', '/')} */}
                        </sub>
                      </>
                    );
                  })
                : ''}
            </span>
            {histories
              ? histories.map(user => {
                  return (
                    <div
                      className={
                        !user.banned
                          ? 'detail-box__user-wrap'
                          : 'detail-box__user-wrap detail-box__user-wrap--banned'
                      }
                    >
                      <div className="user-wrap__left">
                        <img
                          className="detail-box__user-img"
                          src={user.thumbnailUrl}
                          alt={user.id}
                        />
                        {user.userName}
                      </div>
                      <div>
                        {weekDates.map(d => {
                          return user.date.indexOf(d.date) >= 0 ? (
                            <span className="detail-box__submit-flag">✔</span>
                          ) : (
                            <span className="detail-box__submit-flag"></span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              : ''}
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

  componentDidMount() {
    const { currentUser } = this.props;

    console.log(this.props.match.params.id);
    const activeMyMission = currentUser.missions.filter(
      mission => mission.id === this.props.activeMyMissionId,
    )[0];
    console.log(activeMyMission);
    this.setState({
      activeMyMission,
      //activeMissionId :
    });
    axios
      .get(
        `http://api.daily-mission.com/api/post/schedule/mission/${this.props.activeMyMissionId}/0`,
      )
      .then(response => {
        this.setState({
          histories: response.data.histories,
          weekDates: response.data.weekDates,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    const { activeMyMissionId } = this.props;

    if (activeMyMissionId !== prevProps.activeMyMissionId) {
      const { currentUser } = this.props;

      const activeMyMission = currentUser.missions.filter(
        mission => mission.id === activeMyMissionId,
      )[0];

      this.setState({
        activeMyMission,
      });
      axios
        .get(
          `http://api.daily-mission.com/api/post/schedule/mission/${this.props.match.params.id}/0`,
        )
        .then(response => {
          this.setState({
            histories: response.data.histories,
            dates: response.data.dates,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    const {
      currentUser,
      title,
      content,
      file,
      fileName,
      fileImgUrl,
      updateTitleValue,
      updateContentValue,
      handleDrop,
      postBoard,
      DeleteBoard,
      activeMyMissionId,
      closeModel,
    } = this.props;

    const { activeMyMission } = this.state;
    if (!activeMyMission) return <div>로딩중..</div>;
    return (
      <>
        <div className="submit">
          <div className="submit__title">
            <h1 className="submit__title-who">{activeMyMission.title}</h1>
          </div>
          <div className="submit__contents">
            <this.CreateSubmitBox
              file={file}
              m={activeMyMission}
              title={title}
              content={content}
              updateTitleValue={updateTitleValue}
              updateContentValue={updateContentValue}
              fileName={fileName}
              fileImgUrl={fileImgUrl}
              handleDrop={handleDrop}
              postBoard={postBoard}
              DeleteBoard={DeleteBoard}
              closeModel={closeModel}
            />
          </div>
        </div>
        <div className="submit-detail">
          <this.CreateSubmitDetailBox activeMyMission={activeMyMission} />
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      title: state.submitpost.titleValue,
      content: state.submitpost.contentValue,
      fileName: state.submitpost.fileName,
      fileImgUrl: state.submitpost.fileImgUrl,
      file: state.submitpost.file,
    }),
    {
      updateTitleValue,
      updateContentValue,
      postBoard,
      handleDrop,
      closeModel,
    },
  )(Submit),
);
