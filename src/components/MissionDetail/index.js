import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import { Line } from 'rc-progress';

const CreateSubmitDayTable = ({ mission }) => {
  return (
    <table className="shouldSubmitDay-table">
      <thead>
        <tr className="shouldSubmitDay-table__title-row">
          <td>월요일</td>
          <td>화요일</td>
          <td>수요일</td>
          <td>목요일</td>
          <td>금요일</td>
          <td>토요일</td>
          <td>일요일</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{mission.week.mon ? 'O' : 'X'}</td>
          <td>{mission.week.tue ? 'O' : 'X'}</td>
          <td>{mission.week.wed ? 'O' : 'X'}</td>
          <td>{mission.week.thu ? 'O' : 'X'}</td>
          <td>{mission.week.fri ? 'O' : 'X'}</td>
          <td>{mission.week.sat ? 'O' : 'X'}</td>
          <td>{mission.week.sun ? 'O' : 'X'}</td>
        </tr>
      </tbody>
    </table>
  );
};

const CreatePeriodProgress = ({ mission }) => {
  const now = new Date();
  const startDate = new Date(mission.startDate);
  const endDate = new Date(mission.endDate);

  const startToNow = now.getTime() - startDate.getTime();
  const startToNowDay = startToNow / (1000 * 3600 * 24);
  const leftTime = endDate.getTime() - now.getTime();
  const leftDay = leftTime / (1000 * 3600 * 24);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDay = diffTime / (1000 * 3600 * 24);
  console.log(diffDay);
  return startToNow > 0 ? (
    <>
      <Line percent={startToNowDay} strokeWidth="4" strokeColor="#D3D3D3" />
      <span className="detail__leftDays">
        {diffDay}일 중 {Math.floor(leftDay)}일 남음
      </span>
      <span className="detail__leftDate">{mission.endDate} 미션 종료</span>
    </>
  ) : (
    <div className="detail__not-start-mission">
      아직 시작되지 않은 미션입니다.
    </div>
  );
};
class MissionDetail extends React.Component {
  state = {
    inputPasswordMode: false,
    password: '',
  };

  handleInputChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

  passwordToggle = e => {
    this.setState(prevState => ({
      inputPasswordMode: !prevState.inputPasswordMode,
    }));
    e.preventDefault();
  };

  render() {
    const { mission, postAttednigMission } = this.props;
    const { password, inputPasswordMode } = this.state;
    return (
      <div className="App-detail">
        <div className="detail">
          <div className="detail__img-wrap">
            <img className="detail__img" src={mission.thumbnailUrlDetail} />
          </div>
          <div className="detail__content-wrap">
            <div className="detail__title">
              {mission.userName}'s {mission.title}
            </div>
            <div className="detail__content">{mission.content}</div>
            <div className="detail__period-info">
              {/* {mission.startDate} ~ {mission.endDate} */}
              <CreatePeriodProgress mission={mission} />
            </div>
            <button
              className={`detail__attend-btn${
                inputPasswordMode ? '--hidden' : ''
              }`}
              onClick={this.passwordToggle}
            >
              미션 참여하기
            </button>

            <div
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
            </div>
          </div>
        </div>
        {/* <div className="detail-nav-tab">
          <a>정보</a>
          <a>구성원</a>
        </div> */}
        <div className="detail-info">
          <span className="detail-info__mission-info-title">미션 정보</span>
          <div className="detail-info__mission-info-body">
            <div className="mission-info">
              <div className="mission-info__hoilyday-title">미션 기간</div>
              <div className="mission-info__hoilyday">
                2020.02.13 ~ 2020.03.15
              </div>
              <div className="mission-info__hoilyday-title">제출 시간</div>
              <div className="mission-info__hoilyday">익일 03:00시</div>
              <div className="mission-info__hoilyday-title">휴무일</div>
              <div className="mission-info__hoilyday">토요일 일요일</div>
            </div>
          </div>
          <span className="detail-info__mission-info-title">구성원</span>
          <span className="detail-info__mission-info-title-sub">
            {mission.participants.length}
          </span>
          <div className="detail-info__mission-info-body">
            {mission.participants.map(p => (
              <div className="detail-info__user-profile">
                <img
                  className="detail-info__user-profile-img"
                  src={p.imageUrl}
                />
                <span className="detail-info__user-profile-name">
                  <em>{p.userName}</em>
                </span>
              </div>
            ))}
          </div>
          {/* <CreateSubmitDayTable mission={mission} /> */}
        </div>
      </div>
    );
  }
}

export default MissionDetail;
