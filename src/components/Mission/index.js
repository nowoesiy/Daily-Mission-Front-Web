import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const CreateMissionBox = ({ mission }) => {
  return (
    <Link to={'mission/detail/' + mission.id}>
      <div className="all-mission-box">
        <div className="all-mission-box__top">
          <img
            className={`lazy all-mission-box__img ${
              mission.ended ? 'all-mission-box__img--ended' : ''
            }`}
            data-src={mission.thumbnailUrlAll}
            alt={mission.name}
          />
          {mission.ended ? (
            <div className="all-mission-box__ended-label">
              종료된 미션 입니다
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="all-mission-box__body">
          <span>
            <div className="all-mission-box__title">{mission.title}</div>
            <div className="all-mission-box__admin">
              <span>
                <img
                  className="all-mission-box__admin-image"
                  src={mission.userThumbnailUrl}
                  alt={mission.userNAme}
                />
              </span>
              <span>{mission.userName}</span>
            </div>
          </span>
          <div className="all-mission-box__content">{mission.content}</div>
          <div className="all-mission-box__people">
            {mission.userCount}명 미션 참여중
          </div>
        </div>
      </div>
    </Link>
  );
};

const Mission = ({ missions }) => {
  return (
    <div className="mission">
      <div className="mission__upper-text">
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        전체 미션
      </div>
      <div className="mission__list-box">
        {missions.map((m) => (
          <CreateMissionBox mission={m} key={m.id} />
        ))}
      </div>
      <div className="scroll-detector"></div>
    </div>
  );
};

export default Mission;
