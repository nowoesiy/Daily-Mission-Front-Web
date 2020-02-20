import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';

const mission = {
  id: 1,
  missionRule: {
    createdDate: '2020-02-18T10:28:16.777',
    modifiedDate: '2020-02-18T10:28:16.777',
    id: 1,
    week: {
      sun: true,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: false,
      sat: false,
    },
    deleted: false,
  },
  title: '1일 1알고리즘',
  content: '매일매일 하루에 최소 한문제씩 알고리즘을 풀고 인증하는 미션입니다.',
  thumbnailUrl:
    'https://www.nexdatacenter.com/wp-content/uploads/2016/01/The-Next-Energy-Challenge-of-Computing-image-1024x747.jpg',
  startDate: '2020-01-01',
  endDate: '2020-03-28',
  ended: true,
  master: '수박',
  numOfattend: 101,
};
const CreateSubmitDayTable = () => {
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
          <td>{mission.missionRule.week.mon ? 'O' : 'X'}</td>
          <td>{mission.missionRule.week.tue ? 'O' : 'X'}</td>
          <td>{mission.missionRule.week.wed ? 'O' : 'X'}</td>
          <td>{mission.missionRule.week.thu ? 'O' : 'X'}</td>
          <td>{mission.missionRule.week.fri ? 'O' : 'X'}</td>
          <td>{mission.missionRule.week.sat ? 'O' : 'X'}</td>
          <td>{mission.missionRule.week.sun ? 'O' : 'X'}</td>
        </tr>
      </tbody>
    </table>
  );
};
class MissionDetail extends React.Component {
  state = {
    inputPasswordMode: false,
  };

  passwordToggle = e => {
    this.setState(prevState => ({
      inputPasswordMode: !prevState.inputPasswordMode,
    }));
    e.preventDefault();
  };

  render() {
    const { inputPasswordMode } = this.state;
    return (
      <div className="App-detail">
        <div className="detail">
          <div className="detail__img-wrap">
            <img className="detail__img" src={mission.thumbnailUrl} />
          </div>
          <div className="detail__content-wrap">
            <div className="detail__title">{mission.title}</div>
            <div className="detail__content">{mission.content}</div>
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
                placeholder="비밀번호"
              />
              <button
                className="detail__attend-cancelbtn"
                onClick={this.passwordToggle}
              >
                취소
              </button>
              <button className="detail__attend-enterbtn">입장</button>
            </div>
          </div>
        </div>
        <div className="detail-nav-tab">
          <a>정보</a>
          <a>구성원</a>
        </div>
        <div className="detail-info">
          <CreateSubmitDayTable />
        </div>
      </div>
    );
  }
}

export default MissionDetail;
