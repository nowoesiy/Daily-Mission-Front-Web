import React from 'react';
import './index.scss';
import Login from '../Login';
import logo from '../../static/img/logo.png';
import MissionCreatePopup from '../MissionCreatePopup';
import { Link } from 'react-router-dom';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';

class Header extends React.Component {
  render() {
    const { authenticated, currentUser, handleLogout } = this.props;
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
                <MissionCreatePopup />
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <img
                    className="login__profile-img"
                    src={currentUser.thumbnailUrl}
                    alt={currentUser.name}
                  ></img>
                </DropdownTrigger>
                <DropdownContent>
                  <div className="login__profile-dropdown">
                    <div className="profile-dropdown">
                      <span className="profile-dropdown__user-name">
                        {currentUser.name} 님
                      </span>
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
                  </div>
                </DropdownContent>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
