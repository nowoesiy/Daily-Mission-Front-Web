import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../common/ButtonComponent';

const CreateMissionBox = ({ missions, type }) => {
  return missions.map((m) => {
    return (
      <Link to={'mission/detail/' + m.id}>
        <article className="mission-box">
          <div className="mission-box__top">
            <img
              className="mission-box__img"
              src={type === 'hot' ? m.thumbnailUrlHot : m.thumbnailUrlNew}
              alt={m.title}
            />
          </div>
          <div className="mission-box__body">
            <h2 className="mission-box__title">{m.title}</h2>
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
            <p className="mission-box__content">{m.content}</p>
            <div className="mission-box__people">
              {m.userCount}명 미션 참여중
            </div>
          </div>
        </article>
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
    <section className="landing">
      <h1 className="landing__text">{title}</h1>
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
    </section>
  );
};

export default Landing;
