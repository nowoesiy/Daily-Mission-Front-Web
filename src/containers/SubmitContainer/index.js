import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import SubmitPopup from '../../components/SubmitPopup';
import './index.scss';
import { postBoard } from '../../modules/reducer_submitPost';
import { withRouter, Link } from 'react-router-dom';
import FileDrop from 'react-file-drop';
import { closeModel } from '../../modules/reducer_submitPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faSmileWink,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
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
  constructor(props) {
    super(props);
    this.state = {
      isPostPopup: false,
      dates: [],
      histories: [],
      file: '',
      fileName: '',
      activeMyMission: this.props.currentUser.missions.filter(
        mission => mission.id == this.props.match.params.id,
      )[0],
      activeMissionId: this.props.match.params.id,
    };
  }

  handleDrop = file => {
    this.setState({
      file: file[0],
      isPostPopup: true,
    });
  };

  handlePopUp = () => {
    this.setState({
      isPostPopup: !this.state.isPostPopup,
      file: '',
    });
  };

  handleClickFile = e => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  CreateSubmitBox = ({ submit }) => {
    return (
      <div className="submit__box">
        <div className={`box ${submit ? 'box--submit' : ''}`}>
          <div className={`box__top ${submit ? 'box__top--submit' : ''}`}>
            <h2 className="box__title">제출 보드</h2>
          </div>
          <div className="box__body">
            {/* <div className="box__limit-time">⏰ {this.state.leftTime} 남음</div> */}
            <div className="drop-upload-box">
              {!submit ? (
                <FileDrop onDrop={this.handleDrop}>
                  <div
                    className="drop-upload-box__wrap"
                    onClick={this.handlePopUp}
                  >
                    <FontAwesomeIcon icon={faUpload} size="2x" />
                    <span className="drop-upload-box__title">
                      미션 사진을 DRAG 해주세요!
                    </span>
                  </div>
                </FileDrop>
              ) : (
                <div className="drop-upload-box__wrap--submit">
                  {/* <FontAwesomeIcon icon={faSmileWink} size="2x" /> */}
                  <span className="drop-upload-box__title">
                    😊 오늘 하루도 수고하셨습니다!!!
                  </span>
                </div>
              )}
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
            <table style={{ width: '100%' }}>
              <thead className="day-info__title">
                <tr>
                  <th className="day-info__day--first-child"></th>
                  {weekDates
                    ? weekDates.map(d => {
                        return (
                          <th className="day-info__day">
                            {d.day.substr(0, 3)}
                          </th>
                          // <sub className="day-info__title--sub">
                          //   {/* d.date.substr(5).replace('-', '/')} */}
                          // </sub>
                        );
                      })
                    : ''}
                </tr>
              </thead>
              <tbody>
                {histories
                  ? histories.map(user => {
                      return (
                        <tr
                          className={
                            !user.banned
                              ? 'detail-box__user-wrap'
                              : 'detail-box__user-wrap detail-box__user-wrap--banned'
                          }
                        >
                          <td className="detail-box__submit-flag--name">
                            <img
                              className="detail-box__user-img"
                              src={user.thumbnailUrl}
                              alt={user.id}
                            />
                            {user.userName}
                          </td>
                          {weekDates.map(d => {
                            return user.date.indexOf(d.date) >= 0 ? (
                              <td className="detail-box__submit-flag detail-box__submit-flag--submit">
                                <FontAwesomeIcon icon={faCheck} color="green" />
                              </td>
                            ) : d.mandatory ? (
                              <td className="detail-box__submit-flag detail-box__submit-flag--not-submit">
                                <FontAwesomeIcon icon={faTimes} color="red" />
                              </td>
                            ) : (
                              <td className="detail-box__submit-flag">휴무</td>
                            );
                          })}
                        </tr>
                      );
                    })
                  : ''}
              </tbody>
            </table>
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

  getMissionDetail = () => {
    axios
      .get(
        `https://api.daily-mission.com/api/post/schedule/mission/${this.state.activeMissionId}/week/0`,
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
  };

  componentDidMount() {
    axios
      .get(
        `https://api.daily-mission.com/api/post/schedule/mission/${this.state.activeMissionId}/week/0`,
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

    // this.interval = setInterval(() => {
    //   const now = moment();
    //   const then = moment('28-03-2020 18:00:00', 'DD-MM-YYYY HH:mm:ss');
    //   const countdown = moment(then - now);
    //   const hours = countdown.format('H');
    //   const minutes = countdown.format('mm');
    //   const seconds = countdown.format('ss');
    //   const leftTime =
    //     String(hours) +
    //     '시간 ' +
    //     String(minutes) +
    //     '분 ' +
    //     String(seconds) +
    //     '초';
    //   this.setState({ leftTime });
    // }, 1000);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.activeMissionId)
      return {
        activeMissionId: nextProps.match.params.id,
        activeMyMission: nextProps.currentUser.missions.filter(
          mission => mission.id == nextProps.match.params.id,
        )[0],
      };
    else return null;
  }

  render() {
    const { postBoard } = this.props;
    const { file, fileName } = this.state;
    const { isPostPopup, activeMyMission } = this.state;
    if (!activeMyMission) return <div></div>;
    return (
      <>
        <div className="submit">
          <div className="submit__title">
            <h1 className="submit__title-who">{activeMyMission.title}</h1>
          </div>
          <div className="submit__contents">
            <this.CreateSubmitBox submit={activeMyMission.submit} />
          </div>
        </div>
        <div className="submit-detail">
          <this.CreateSubmitDetailBox activeMyMission={activeMyMission} />
        </div>
        {isPostPopup ? (
          <SubmitPopup
            id={activeMyMission.id}
            postBoard={postBoard}
            file={file}
            fileName={fileName}
            handlePopUp={this.handlePopUp}
            handleClickFile={this.handleClickFile}
          />
        ) : (
          ''
        )}
      </>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMissionId } = this.state;
    const { currentUser } = this.props;
    if (activeMissionId != prevState.activeMissionId) {
      this.setState({
        activeMyMission: currentUser.missions.filter(
          mission => mission.id == activeMissionId,
        )[0],
      });
      axios
        .get(
          `https://api.daily-mission.com/api/post/schedule/mission/${this.props.match.params.id}/week/0`,
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

    if (currentUser.missions !== prevProps.currentUser.missions) {
      const activeMyMission = currentUser.missions.filter(
        mission => mission.id === activeMissionId,
      )[0];

      this.setState({
        activeMyMission,
      });
    }
  }
}

export default withRouter(
  connect(
    state => ({
      currentUser: state.loginAuth.currentUser,
    }),
    {
      postBoard,
    },
  )(Submit),
);
