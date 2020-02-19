import React from 'react';
import './index.scss';

class Aside extends React.Component {
  render() {
    return (
      <div className="App-aside">
        <ul className="nav">
          <li className="nav__list nav__list--home">🏠 홈</li>
          <li className="nav__list nav__list--all-mission">🚀 전체 미션</li>
          <li className="nav__list nav__list--hot-mission">🔥 Hot 미션</li>
          <li className="nav__list nav__list--recent-posting">
            📃 최근 포스팅
          </li>
          <li className="nav__list nav__list--my">👤 MY</li>
        </ul>
      </div>
    );
  }
}

export default Aside;
