import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const mission = [
  {
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
    content:
      '매일매일 하루에 최소 한문제씩 알고리즘을 풀고 인증하는 미션입니다.',
    thumbnailUrlAll:
      'https://www.nexdatacenter.com/wp-content/uploads/2016/01/The-Next-Energy-Challenge-of-Computing-image-1024x747.jpg',
    startDate: '2020-01-01',
    endDate: '2020-03-28',
    ended: true,
    master: '수박',
    numOfattend: 101,
  },
  {
    id: 2,
    missionRule: {
      createdDate: '2020-02-18T10:28:16.777',
      modifiedDate: '2020-02-18T10:28:16.777',
      id: 2,
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
    title: '아침 밥 먹기',
    content: '매일 매일 아침 밥을 먹는 미션입니다.',
    thumbnailUrlAll:
      'https://pds.joins.com/news/component/healthmedia/201708/04/133c7e02835ca.jpg',
    startDate: '2020-01-01',
    endDate: '2020-03-28',
    ended: true,
    master: '아침이',
    numOfattend: 10,
  },
  {
    id: 3,
    missionRule: {
      createdDate: '2020-02-18T10:28:16.777',
      modifiedDate: '2020-02-18T10:28:16.777',
      id: 3,
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
    title: '매일 매일 운동하기',
    content: '1일 1 헬스나 운동하실 분들 들어오세요~ ',
    thumbnailUrlAll:
      'https://newsimg.hankookilbo.com/2018/03/07/201803070494276763_1.jpg',
    startDate: '2020-01-01',
    endDate: '2020-03-28',
    ended: true,
    master: '운동맨',
    numOfattend: 130,
  },
  {
    id: 4,
    missionRule: {
      createdDate: '2020-02-18T10:28:16.777',
      modifiedDate: '2020-02-18T10:28:16.777',
      id: 4,
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
    title: '비타민 챙겨먹기',
    content: '비타민 먹고 인증하는 미션입니다:)',
    thumbnailUrlAll:
      'https://photo.jtbc.joins.com/news/2018/02/19/20180219172700343.jpg',
    startDate: '2020-01-01',
    endDate: '2020-03-28',
    ended: false,
    master: '비타민냠냠',
    numOfattend: 200,
  },
  {
    id: 5,
    missionRule: {
      createdDate: '2020-02-18T10:28:16.777',
      modifiedDate: '2020-02-18T10:28:16.777',
      id: 5,
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
    title: '1일 1쉐프의 그릴',
    content: '쉐프의 그릴 ㄲ',
    thumbnailUrlAll:
      'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile21.uf.tistory.com%2Fimage%2F9901FB445D4A9CA431BF50',
    startDate: '2020-01-01',
    endDate: '2020-03-28',
    ended: true,
    master: '이민호',
    numOfattend: 3,
  },
];

class Mission extends React.Component {
  MissionBox = ({ mission }) => {
    return mission.map(m => {
      return (
        <Link to={'mission/detail/' + m.id}>
          <div className="all-mission-box">
            <div className="all-mission-box__top">
              <img
                className={`all-mission-box__img all-mission-box__img--${
                  m.ended ? 'ended' : ''
                }`}
                src={m.thumbnailUrlAll}
              />
              {m.ended ? (
                <div className="all-mission-box__ended-label">
                  종료된 미션 입니다
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="all-mission-box__body">
              <span>
                <div className="all-mission-box__title">{m.title}</div>
                <div className="all-mission-box__admin">
                  <span>
                    <img
                      className="all-mission-box__admin-image"
                      src={m.userThumbnailUrl}
                    />
                  </span>
                  <span>{m.userName}</span>
                </div>
              </span>
              <div className="all-mission-box__content">{m.content}</div>
              <div className="all-mission-box__people">
                {m.userCount}명 미션 참여중
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    const { missions } = this.props;
    return (
      <div className="mission">
        <div className="mission__upper-text">🚀 전체 미션</div>
        <div className="mission__list-box">
          <this.MissionBox mission={missions} />
        </div>
      </div>
    );
  }
}

export default Mission;
