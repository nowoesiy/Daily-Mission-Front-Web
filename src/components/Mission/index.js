import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { lazyLoad } from '../../util/lazyLoad.js';

const MissionBox = ({ missions }) => {
  return missions.map((m) => {
    return (
      <Link to={'mission/detail/' + m.id}>
        <div className="all-mission-box">
          <div className="all-mission-box__top">
            <img
              className={`all-mission-box__img lazy all-mission-box__img--${
                m.ended ? 'ended' : ''
              }`}
              src={m.thumbnailUrlAll}
              alt={m.name}
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
                    alt={m.userNAme}
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

class Mission extends React.Component {
  render() {
    const { missions } = this.props;
    return (
      <div className="mission">
        <div className="mission__upper-text">
          <span role="img" aria-label="rocket">
            🚀
          </span>{' '}
          전체 미션
        </div>
        <div className="mission__list-box">
          <MissionBox missions={missions} />
        </div>
      </div>
    );
  }
}

export default Mission;
