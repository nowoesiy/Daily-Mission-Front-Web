import React from 'react';
import './index.scss';
import Login from '../Login';
import Popup from 'reactjs-popup';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';

class Header extends React.Component {
  user = {
    id: 2,
    name: 'seowonlee',
    imageUrl:
      'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
  };

  render() {
    const { authenticated, currentUser, handleLogout } = this.props;
    return (
      <div className="header">
        <div className="header__logo">
          <strong>DailyMission</strong>
        </div>
        <div className="header__login">
          {!currentUser ? (
            <Popup
              modal
              trigger={
                <button className="header__logInOut-button" type="button">
                  로그인
                </button>
              }
            >
              <Login />
            </Popup>
          ) : (
            <div className="login">
              <Dropdown>
                <DropdownTrigger>
                  <img
                    className="login__profile-img"
                    src={currentUser.imageUrl}
                    alt={currentUser.name}
                  ></img>
                </DropdownTrigger>
                <DropdownContent>
                  <div className="login__profile-dropdown">
                    <div className="profile-dropdown">
                      <span className="profile-dropdown__user-name">
                        {currentUser.name}
                      </span>
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
