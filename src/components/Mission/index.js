import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const CreateMissionBox = ({ mission }) => {
  return (
    <Link to={'mission/detail/' + mission.id}>
      <article className="all-mission-box">
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
          <h2 className="all-mission-box__title">{mission.title}</h2>
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
          <p className="all-mission-box__content">{mission.content}</p>
          <div className="all-mission-box__people">
            {mission.userCount}명 미션 참여중
          </div>
        </div>
      </article>
    </Link>
  );
};

const Mission = ({ missions }) => {
  return (
    <section className="mission">
      <h1 className="mission__upper-text">
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        전체 미션
      </h1>
      <div className="mission__list-box">
        {missions.map((m) => (
          <CreateMissionBox mission={m} key={m.id} />
        ))}
      </div>
      <div className="scroll-detector"></div>
    </section>
  );
};

export default Mission;
