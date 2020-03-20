import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
// const mission = [
//   {
//     id: 1,
//     missionRule: {
//       createdDate: '2020-02-18T10:28:16.777',
//       modifiedDate: '2020-02-18T10:28:16.777',
//       id: 1,
//       week: {
//         sun: true,
//         mon: true,
//         tue: true,
//         wed: true,
//         thu: true,
//         fri: false,
//         sat: false,
//       },
//       deleted: false,
//     },
//     title: '1일 1알고리즘',
//     content:
//       '매일매일 하루에 최소 한문제씩 알고리즘을 풀고 인증하는 미션입니다.',
//     thumbnailUrl:
//       'https://bcuassets.blob.core.windows.net/img/computing-research-degrees-banner-image-131934047124660430.jpg',
//     startDate: '2020-01-01',
//     endDate: '2020-03-28',
//     ended: true,
//     master: '수박',
//     numOfattend: 101,
//   },
//   {
//     id: 2,
//     missionRule: {
//       createdDate: '2020-02-18T10:28:16.777',
//       modifiedDate: '2020-02-18T10:28:16.777',
//       id: 2,
//       week: {
//         sun: true,
//         mon: true,
//         tue: true,
//         wed: true,
//         thu: true,
//         fri: false,
//         sat: false,
//       },
//       deleted: false,
//     },
//     title: '아침 밥 먹기',
//     content: '매일 매일 아침 밥을 먹는 미션입니다.',
//     thumbnailUrl:
//       'https://pds.joins.com/news/component/healthmedia/201708/04/133c7e02835ca.jpg',
//     startDate: '2020-01-01',
//     endDate: '2020-03-28',
//     ended: true,
//     master: '아침이',
//     numOfattend: 10,
//   },
//   {
//     id: 3,
//     missionRule: {
//       createdDate: '2020-02-18T10:28:16.777',
//       modifiedDate: '2020-02-18T10:28:16.777',
//       id: 3,
//       week: {
//         sun: true,
//         mon: true,
//         tue: true,
//         wed: true,
//         thu: true,
//         fri: false,
//         sat: false,
//       },
//       deleted: false,
//     },
//     title: '매일 매일 운동하기',
//     content: '1일 1 헬스나 운동하실 분들 들어오세요~ ',
//     thumbnailUrl:
//       'https://newsimg.hankookilbo.com/2018/03/07/201803070494276763_1.jpg',
//     startDate: '2020-01-01',
//     endDate: '2020-03-28',
//     ended: true,
//     master: '운동맨',
//     numOfattend: 130,
//   },
// ];
class Landing extends React.Component {
  popularMissionBox = ({ mission, type }) => {
    return mission.map(m => {
      return (
        <Link to={'mission/detail/' + m.id}>
          <div className="mission-box">
            <div className="mission-box__top">
              <img
                className="mission-box__img"
                src={type == 'hot' ? m.thumbnailUrlHot : m.thumbnailUrlNew}
              />
            </div>
            <div className="mission-box__body">
              <span>
                <div className="mission-box__title">{m.title}</div>
                <div className="mission-box__admin">
                  <span>
                    <img
                      className="mission-box__admin-image"
                      src={m.userThumbnailUrl}
                    />
                  </span>
                  <span>{m.userName}</span>
                </div>
              </span>
              <div className="mission-box__content">{m.content}</div>
              <div className="mission-box__people">
                {m.userCount}명 미션 참여중
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    const { missions, hotMissions } = this.props;
    const missionsReduce = missions.slice(0, 4);
    return (
      <div className="landing">
        <div className="landing__popular-text">🔥 Hot한 미션</div>
        <div className="landing__popular-box">
          <this.popularMissionBox type={'hot'} mission={hotMissions} />
        </div>

        <div className="landing__new-text">✌ 신규 미션</div>
        <div className="landing__popular-box">
          <this.popularMissionBox type={'new'} mission={missionsReduce} />
        </div>
      </div>
    );
  }
}

export default Landing;
