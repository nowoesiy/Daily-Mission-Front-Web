import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import { Line } from 'rc-progress';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ImageDetailPopup from '../ImageDetailPopup';
// const mission = {
//   id: 53,
//   week: {
//     sun: false,
//     mon: true,
//     tue: true,
//     wed: true,
//     thu: true,
//     fri: true,
//     sat: false,
//   },
//   userId: 2,
//   userName: '수바기',
//   title: '1일 1유니온',
//   content: '평일 아침 9시에 유니온에 도착하는 미션입니다.',
//   thumbnailUrlDetail:
//     'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/202003111750_union_400_600.jpg',
//   participants: [
//     {
//       id: 5,
//       userName: '무법자',
//       thumbnailUrl:
//         'https://image.daily-mission.com/naver/5/202003262113_profile_40_40.PNG',
//       banned: false,
//     },
//     {
//       id: 4,
//       userName: 'NEVER',
//       thumbnailUrl:
//         'https://image.daily-mission.com/google/4/202003170955_naver-logo_40_40.png',
//       banned: true,
//     },
//   ],
//   startDate: '2020-03-30',
//   endDate: '2020-07-02',
//   ended: false,
// };

const MissionAttendPopup = ({
  mission,
  password,
  postAttednigMission,
  handleInputChange,
  handleOnClickPopUp,
}) => {
  return (
    <div className="overlay">
      <div className="detail__password-wrap">
        <div className="password-wrap">
          <a
            className="submit-board__cancel-button"
            onClick={handleOnClickPopUp}
          >
            ×
          </a>
          <div className="password-wrap__label">
            해당 미션에 참여하기 위해서는 참여코드가 필요합니다.
          </div>
          <div className="password-wrap__attend">
            <input
              className="password-wrap__attend-pwd"
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="참여 코드"
            />

            <button
              className={`password-wrap__attend-btn ${
                password ? '' : 'password-wrap__attend-btn--error'
              }`}
              onClick={() => {
                postAttednigMission(mission.id, password);
                handleOnClickPopUp();
              }}
              disabled={!password}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatePeriodProgress = ({ mission }) => {
  const now = new Date();
  const startDate = new Date(mission.startDate);
  const endDate = new Date(mission.endDate);
  endDate.setDate(endDate.getDate() + 1);
  const startToNow = now.getTime() - startDate.getTime();
  const startToNowDay = startToNow / (1000 * 3600 * 24);
  const leftTime = endDate.getTime() - now.getTime();
  const leftDay = Math.floor(leftTime / (1000 * 3600 * 24) + 1);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDay = diffTime / (1000 * 3600 * 24);

  return startToNow > 0 ? (
    mission.ended ? (
      <span className="content-wrap__attend-label">종료된 미션입니다.</span>
    ) : (
      <>
        <Line
          percent={100 - (leftDay / diffDay) * 100}
          strokeWidth="4"
          strokeColor="#D3D3D3"
        />
        <span className="content-wrap__leftDays">
          {diffDay}일 중 {Math.floor(leftDay)}일 남음
        </span>
        <span className="content-wrap__leftDate">
          {mission.endDate} 미션 종료
        </span>
      </>
    )
  ) : (
    <div className="content-wrap__not-start-mission">
      {mission.startDate} ~ {mission.endDate}
    </div>
  );
};

const CreateMissionAttendButton = ({ mission, handleOnClickPopUp }) => {
  const now = new Date();
  const startDate = new Date(mission.startDate);
  const endDate = new Date(mission.endDate);

  const startToNow = now.getTime() - startDate.getTime();
  const startToNowDay = startToNow / (1000 * 3600 * 24);
  const leftTime = endDate.getTime() - now.getTime();
  const leftDay = Math.floor(leftTime / (1000 * 3600 * 24) + 1);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDay = diffTime / (1000 * 3600 * 24);
  return startToNow > 0 ? (
    mission.ended ? (
      ''
    ) : (
      <span className="content-wrap__attend-label">
        이미 시작한 미션입니다 ?
      </span>
    )
  ) : (
    <button className="content-wrap__attend-btn" onClick={handleOnClickPopUp}>
      미션 참여하기
    </button>
  );
};

const CreatePostingBox = ({ handleClickImage, post }) => {
  return (
    <div className="post-thumbnailbox">
      <div className="post-thumbnailbox__top">
        <img
          className="post-thumbnailbox__img"
          src={post.thumbnailUrlMission}
          onClick={() => {
            handleClickImage(post.thumbnailUrlMission);
          }}
          alt={post.id}
        />
      </div>
      <div className="post-thumbnailbox__body">
        <div className="post-thumbnailbox__title">{post.title}</div>
        <div className="post-thumbnailbox__content">{post.content}</div>
      </div>
      <div className="post-thumbnailbox__bottom">
        <div>
          <span className="post-thumbnailbox__author-wrap">
            <img
              className="post-thumbnailbox__author-img"
              src={post.userThumbnailUrl}
            />
            By{' '}
            <strong className="post-thumbnailbox__author-name">
              {post.userName}
            </strong>
          </span>
        </div>
        <div className="post-thumbnailbox__date">
          {post.modifiedDate.substr(0, 10)}
        </div>
      </div>
    </div>
  );
};

class MissionDetailB extends React.Component {
  state = {
    mission: '',
    missionPost: '',
    isAttendPopup: false,
    inputPasswordMode: false,
    password: '',
    isPopUp: false,
    activePostImg: '',
  };

  handleClickImage = (url) => {
    this.setState({
      isPopUp: !this.state.isPopUp,
      activePostImg: url,
    });
  };

  handleOnClickPopUp = () => {
    this.setState({
      isAttendPopup: !this.state.isAttendPopup,
      password: '',
    });
  };

  handleInputChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  passwordToggle = (e) => {
    this.setState((prevState) => ({
      inputPasswordMode: !prevState.inputPasswordMode,
    }));
    e.preventDefault();
  };

  getMissionInfo = () => {
    axios
      .get(
        `https://api.daily-mission.com/api/mission/${this.props.match.params.id}`,
      )
      .then((response) => {
        this.setState({
          mission: response.data,
        });
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };

  getMissionPosting = () => {
    axios
      .get(
        `https://api.daily-mission.com/api/post/all/mission/${this.props.match.params.id}`,
      )
      .then((response) => {
        this.setState({
          missionPost: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getMissionInfo();
    this.getMissionPosting();
  }

  render() {
    const {
      missionPost,
      mission,
      password,
      isPopUp,
      activePostImg,
    } = this.state;

    if (!mission) return <div></div>;
    return (
      <div className="App-detail">
        {isPopUp && (
          <ImageDetailPopup
            handleClickImage={this.handleClickImage}
            activePostImg={activePostImg}
          />
        )}
        <div className="detail">
          <div className="detail__wrap">
            <img className="detail__img" src={mission.thumbnailUrlDetail} />
            <div className="detail__content-wrap">
              <div className="content-wrap">
                <div className="content-wrap__top">
                  <div className="content-wrap__title">
                    {mission.userName}'s {mission.title}
                  </div>
                  <div className="content-wrap__content">{mission.content}</div>
                </div>
                <div className="content-wrap__period-info">
                  {/* {mission.startDate} ~ {mission.endDate} */}
                  <CreatePeriodProgress mission={mission} />
                </div>
                <div className="content-wrap__submit-day">
                  <div
                    className={`content-wrap__day ${
                      mission.week.sun ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    일
                  </div>
                  <div
                    className={`content-wrap__day ${
                      mission.week.mon ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    월
                  </div>
                  <div
                    className={`content-wrap__day ${
                      mission.week.tue ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    화
                  </div>
                  <div
                    className={`content-wrap__day ${
                      mission.week.wed ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    수
                  </div>
                  <div
                    className={`content-wrap__day ${
                      mission.week.thu ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    목
                  </div>
                  <div
                    className={`content-wrap__day ${
                      mission.week.fri ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    금
                  </div>
                  <div
                    className={`content-wrap__day ${
                      mission.week.sat ? '' : 'content-wrap__day--not-submit'
                    }`}
                  >
                    토
                  </div>
                </div>
                <div className="content-wrap__button-wrap">
                  <span className="content-wrap__attend-label">
                    로그인 후 참여해 주세요!
                  </span>
                </div>
                {this.state.isAttendPopup && (
                  <MissionAttendPopup
                    mission={mission}
                    password={password}
                    handleOnClickPopUp={this.handleOnClickPopUp}
                    handleInputChange={this.handleInputChange}
                  />
                )}
                {/* <div
                className={`detail__password-wrap${
                  inputPasswordMode ? '' : '--hidden'
                }`}
              >
                <input
                  className="detail__attend-pwd"
                  type="password"
                  value={password}
                  onChange={e => this.handleInputChange(e)}
                  placeholder="비밀번호"
                />
                <button
                  className="detail__attend-btn detail__attend-btn--cancel"
                  onClick={this.passwordToggle}
                >
                  취소
                </button>
                <button
                  className="detail__attend-btn detail__attend-btn--enter"
                  onClick={postAttednigMission(mission.id, password)}
                >
                  입장
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="detail-nav-tab">
          <a>정보</a>
          <a>구성원</a>
        </div> */}
        <div className="detail-info">
          {/* <div className="detail-info__mission-info-title">미션 정보</div>
          <div className="detail-info__mission-info-body">
            <div className="mission-info">
              <div className="mission-info__wrap">
                <div className="mission-info__hoilyday-title">미션 기간</div>
                <div className="mission-info__hoilyday">
                  2020.02.13 ~ 2020.03.15
                </div>
              </div>
              <div className="mission-info__wrap">
                <div className="mission-info__hoilyday-title">제출 시간</div>
                <div className="mission-info__hoilyday">익일 03:00시</div>
              </div>

              <div className="mission-info__wrap">
                <div className="mission-info__hoilyday-title">휴무일</div>
                <div className="mission-info__hoilyday">토요일 일요일</div>
              </div>
            </div>
          </div> */}
          <div className="detail-info__post-title">
            참여자
            <span className="detail-info__mission-info-title-sub">
              {mission.participants.length}
            </span>
          </div>

          <div className="detail-info__mission-info-body">
            {mission.participants.map((p) => (
              <div className="detail-info__user-profile">
                <img
                  className="detail-info__user-profile-img"
                  src={p.thumbnailUrl}
                />
                <span
                  className={`detail-info__user-profile-name ${
                    p.banned ? 'detail-info__user-profile-name--banned' : ''
                  }`}
                >
                  {p.userName}
                </span>
              </div>
            ))}
          </div>
          <div className="detail-info__post-title">포스팅</div>
          <div className="detail-info__post-wrap">
            {missionPost.length ? (
              missionPost.map((post) => (
                <CreatePostingBox
                  post={post}
                  handleClickImage={this.handleClickImage}
                />
              ))
            ) : (
              <div className="detail-info__post-label">
                미션 포스트가 없습니다 😐
              </div>
            )}
            {/* <CreateSubmitDayTable mission={mission} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MissionDetailB);