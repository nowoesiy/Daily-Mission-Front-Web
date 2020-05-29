import React from 'react';
import './index.scss';
import { Link, NavLink } from 'react-router-dom';

const activeStyle = {
  fontWeight: 800,
  borderRight: '5px solid #798dc1',
  display: 'block',
};

const CreateUserMissionList = ({
  currentUser,
  isMyNavVisible,
  onClickMyMissionList,
}) => {
  return (
    <ul className={`my-nav${isMyNavVisible ? '' : '--hidden'}`}>
      {currentUser.missions.map((mission) => {
        if (mission.banned === false) {
          return (
            <Link to={`/my/${mission.id}`} exact>
              <li
                className="my-nav__list"
                onClick={() => onClickMyMissionList(mission.id)}
              >
                {mission.title}
              </li>
            </Link>
          );
        }
      })}
    </ul>
  );
};

const CreateLoginAlert = ({ isMyNavVisible }) => {
  return (
    <ul className={`my-nav${isMyNavVisible ? '' : '--hidden'}`}>
      <li className="my-nav__login">
        <Link to={'/login'}>
          <span className="my-nav__login-text">로그인</span>
        </Link>{' '}
        해 주세요!
      </li>
    </ul>
  );
};

const Aside = ({
  currentUser,
  onClickMyMissionList,
  isMyNavVisible,
  toggleBox,
}) => {
  return (
    <div className="App-aside">
      <ul className="nav">
        <NavLink to="/" exact activeStyle={activeStyle}>
          <li className="nav__list nav__list--home">🏠 홈</li>
        </NavLink>
        <NavLink to="/mission" activeStyle={activeStyle}>
          <li className="nav__list nav__list--all-mission">🚀 전체 미션</li>
        </NavLink>
        <NavLink to="/post" activeStyle={activeStyle}>
          <li className="nav__list nav__list--recent-posting">📃 포스팅</li>
        </NavLink>
        <NavLink to={currentUser ? '/my' : '/login'} activeStyle={activeStyle}>
          <li className="nav__list nav__list--my">
            👤 MY
            <input
              className="nav__list--my-toggle"
              type="checkbox"
              checked={isMyNavVisible}
              id="my-toggle"
              readOnly
            ></input>
            <label
              className="nav__list--my-toggle-icon"
              htmlFor="my-toggle"
              role="button"
              onClick={
                ((e) => {
                  e.stopPropagation();
                },
                toggleBox)
              }
            ></label>
          </li>
        </NavLink>
        {currentUser ? (
          <CreateUserMissionList
            currentUser={currentUser}
            isMyNavVisible={isMyNavVisible}
            onClickMyMissionList={onClickMyMissionList}
          />
        ) : (
          <CreateLoginAlert isMyNavVisible={isMyNavVisible} />
        )}
      </ul>
    </div>
  );
};

export default Aside;
