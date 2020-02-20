import React from 'react';
import './index.scss';
import { Link, NavLink } from 'react-router-dom';

const activeStyle = {
  fontWeight: 800,
  textDecoration: 'underline',
};
class Aside extends React.Component {
  state = {
    isMyNavVisible: false,
  };

  toggleBox = e => {
    this.setState(prevState => ({ isMyNavVisible: !prevState.isMyNavVisible }));
    e.preventDefault();
  };

  render() {
    const { currentUser } = this.props;
    const { isMyNavVisible } = this.state;
    return (
      <div className="App-aside">
        <ul className="nav">
          <NavLink to="/" exact activeStyle={activeStyle}>
            <li className="nav__list nav__list--home">🏠 홈</li>
          </NavLink>
          <NavLink to="/mission" activeStyle={activeStyle}>
            <li className="nav__list nav__list--all-mission">🚀 전체 미션</li>
          </NavLink>
          <NavLink to="/hot-mission" activeStyle={activeStyle}>
            <li className="nav__list nav__list--hot-mission">🔥 Hot 미션</li>
          </NavLink>
          <NavLink to="/post" activeStyle={activeStyle}>
            <li className="nav__list nav__list--recent-posting">
              📃 최근 포스팅
            </li>
          </NavLink>
          <NavLink
            to={currentUser ? '/my' : '/login'}
            activeStyle={activeStyle}
          >
            <li className="nav__list nav__list--my">
              👤 MY
              <input
                className="nav__list--my-toggle"
                type="checkbox"
                onClick={this.toggleBox}
                id="my-toggle"
              ></input>
              <label
                className="nav__list--my-toggle-icon"
                for="my-toggle"
                role="button"
                onClick={e => {
                  e.stopPropagation();
                }}
              ></label>
            </li>
          </NavLink>
          {currentUser ? (
            <ul className={`my-nav${isMyNavVisible ? '' : '--hidden'}`}>
              <li className="my-nav__list">1일 1알고리즘</li>
              <li className="my-nav__list">아침밥 먹기</li>
              <li className="my-nav__list">매일 운동하기</li>
            </ul>
          ) : (
            <ul className={`my-nav${isMyNavVisible ? '' : '--hidden'}`}>
              <div className="my-nav__login">
                <Link to={'/login'}>
                  <span className="my-nav__login-text">로그인</span>
                </Link>{' '}
                해 주세요!
              </div>
            </ul>
          )}
        </ul>
      </div>
    );
  }
}

export default Aside;
