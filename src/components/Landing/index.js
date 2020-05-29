import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../ButtonComponent';

const CreateMissionBox = ({ missions, type }) => {
  return missions.map((m) => {
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
  handleSwiperLeftClick,
  handleSwiperRightClick,
  MissionIndex,
  checkNavigator,
  checkDisable,
  setBox,
  title,
  type,
}) => {
  return (
    <div className="landing">
      <div className="landing__text">{title}</div>
      <div className="landing__box" ref={setBox}>
        <div className="landing__button-wrap">
          {checkNavigator && (
            <ButtonComponent
              icon={faChevronLeft}
              func={handleSwiperLeftClick}
              disabled={MissionIndex === 0 ? true : false}
            />
          )}
        </div>
        <CreateMissionBox type={type} missions={missions} />
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
    </div>
  );
};

export default Landing;
