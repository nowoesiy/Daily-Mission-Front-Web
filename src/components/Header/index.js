import React from 'react';
import './index.scss';
import Login from '../Login';
import logo from '../../static/img/logo.png';
import MissionCreatePopup from '../MissionCreatePopup';
import { Link } from 'react-router-dom';
class Header extends React.Component {
  state = {
    profileToggle: false,
  };

  handleProfileClick = () => {
    this.setState({
      profileToggle: !this.state.profileToggle,
    });
  };
  render() {
    const { currentUser, handleLogout, postMission, attendCode } = this.props;
    const { profileToggle } = this.state;
    return (
      <div className="header">
        <div className="header__logo-wrap">
          {/* <strong>DailyMission</strong> */}
          <Link to="/" exact>
            <img className="header__logo " src={logo} />
          </Link>
        </div>
        <div className="header__login">
          {!currentUser ? (
            <Link to="/login">
              <button className="header__logInOut-button" type="button">
                로그인
              </button>
            </Link>
          ) : (
            <div className="login">
              <div classNae="login__button-wrap">
                <MissionCreatePopup
                  postMission={postMission}
                  attendCode={attendCode}
                />
              </div>
              <img
                className="login__profile-img"
                src={currentUser.thumbnailUrl}
                alt={currentUser.name}
                onClick={this.handleProfileClick}
              ></img>
              {profileToggle ? (
                <div className="profile-dropdown">
                  <span className="profile-dropdown__user-name">
                    <strong>{currentUser.name} 님</strong>
                  </span>
                  <Link to="/my/edit">
                    <span className="profile-dropdown__edit-profile">
                      계정 정보 변경
                    </span>
                  </Link>
                  <Link to="/my">
                    <span className="profile-dropdown__my-page">👤MY</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="profile-dropdown__logout-button"
                    type="button"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
