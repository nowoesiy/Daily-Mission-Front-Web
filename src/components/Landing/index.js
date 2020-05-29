import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../ButtonComponent';

const CreateMissionBox = ({ mission, type }) => {
  return mission.map((m) => {
    return (
      <Link to={'mission/detail/' + m.id}>
        <div className="mission-box">
          <div className="mission-box__top">
            <img
              className="mission-box__img"
              src={type === 'hot' ? m.thumbnailUrlHot : m.thumbnailUrlNew}
              alt={m.title}
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
                    alt={m.userName}
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

const Landing = ({
  missions,
  hotMissions,
  handleSwiperLeftClick,
  handleSwiperRightClick,
  handleSwiperNewLeftClick,
  handleSwiperNewRightClick,
  hotMissionIndex,
  newMissionIndex,
  numOfList,
  checkNavigator,
  checkDisable,
  setBox,
}) => {
  return (
    <div className="landing">
      <div className="landing__popular-text">🔥 Hot한 미션</div>
      <div className="landing__popular-box" ref={setBox}>
        <div className="landing__button-wrap">
          {checkNavigator && (
            <ButtonComponent
              icon={faChevronLeft}
              func={handleSwiperLeftClick}
              disabled={hotMissionIndex === 0 ? true : false}
            />
          )}
        </div>
        <CreateMissionBox type={'hot'} mission={hotMissions} />
        <div className="landing__button-wrap">
          {checkNavigator && (
            <ButtonComponent
              icon={faChevronRight}
              func={handleSwiperRightClick}
              disabled={checkDisable ? true : false}
            />
          )}
        </div>
      </div>

      <div className="landing__new-text">✌ 신규 미션</div>
      <div className="landing__popular-box">
        <div className="landing__button-wrap">
          {checkNavigator && (
            <ButtonComponent
              icon={faChevronLeft}
              func={handleSwiperNewLeftClick}
              disabled={newMissionIndex === 0 ? true : false}
            />
          )}
        </div>
        <CreateMissionBox type={'new'} mission={missions} />
        <div className="landing__button-wrap">
          {checkNavigator && (
            <ButtonComponent
              icon={faChevronRight}
              func={handleSwiperNewRightClick}
              disabled={
                newMissionIndex === missions.length - numOfList ? true : false
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
