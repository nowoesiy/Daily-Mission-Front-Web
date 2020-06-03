import React from 'react';

const ParticipantBox = ({ mission }) => {
  if (!mission) return <div></div>;
  return (
    <div className="detail-info">
      <div className="detail-info__post-title">
        참여자
        <span className="detail-info__mission-info-title-sub">
          {mission.participants.length}
        </span>
      </div>
      <div className="detail-info__mission-info-body">
        {mission.participants.map((p) => (
          <div key={p.id} className="detail-info__user-profile">
            <img
              className="detail-info__user-profile-img"
              src={p.thumbnailUrl}
              alt={p.userName}
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
    </div>
  );
};

export default ParticipantBox;
