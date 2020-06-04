import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import logo from '../../static/img/logo.png';
import MissionCreateContainer from '../../components/MissionCreatePopup';

const CreateProfileDropDown = ({ handleLogout, currentUser, boxRef }) => {
  return (
    <div className="profile-dropdown" ref={boxRef}>
      <span className="profile-dropdown__user-name">
        <strong>{currentUser.name} 님</strong>
      </span>
      <Link to="/my/edit">
        <span className="profile-dropdown__edit-profile">계정 정보 변경</span>
      </Link>
      <Link to="/my">
        <span className="profile-dropdown__my-page">
          <span role="img" aria-label="man">
            👤
          </span>
          MY
        </span>
      </Link>
      <button
        onClick={handleLogout}
        className="profile-dropdown__logout-button"
        type="button"
      >
        로그아웃
      </button>
    </div>
  );
};

const CreateloginSection = () => {
  return (
    <Link to="/login">
      <button className="header__logInOut-button" type="button">
        로그인
      </button>
    </Link>
  );
};

const CreateUserSection = ({
  currentUser,
  postMission,
  attendCode,
  profileToggle,
  handleProfileClick,
  handleLogout,
  boxRef,
}) => {
  return (
    <div className="login">
      <div classNae="login__button-wrap">
        <MissionCreateContainer
          postMission={postMission}
          attendCode={attendCode}
        />
      </div>
      <img
        className="login__profile-img"
        src={currentUser.thumbnailUrl}
        alt={currentUser.name}
        onClick={handleProfileClick}
      ></img>
      {profileToggle && (
        <CreateProfileDropDown
          currentUser={currentUser}
          handleLogout={handleLogout}
          boxRef={boxRef}
        />
      )}
    </div>
  );
};

const Header = ({
  currentUser,
  postMission,
  attendCode,
  profileToggle,
  handleProfileClick,
  boxRef,
  handleLogout,
}) => {
  return (
    <header className="header">
      <div className="header__logo-wrap">
        <Link to="/" exact="true">
          <img className="header__logo " src={logo} alt="Daily-Mission" />
        </Link>
      </div>

      <div className="header__login">
        {currentUser ? (
          <CreateUserSection
            currentUser={currentUser}
            postMission={postMission}
            attendCode={attendCode}
            profileToggle={profileToggle}
            handleProfileClick={handleProfileClick}
            boxRef={boxRef}
            handleLogout={handleLogout}
          />
        ) : (
          <CreateloginSection />
        )}
      </div>
    </header>
  );
};

export default Header;
