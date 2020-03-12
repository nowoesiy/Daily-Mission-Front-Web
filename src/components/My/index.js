import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

class My extends React.Component {
  CreateMissionList = ({ mission }) => {
    const { onClickMyMissionList } = this.props;
    return (
      <Link to={`my/${mission.id}`}>
        <div
          className={`list-box ${
            mission.submit ? 'list-box--submit' : 'list-box--not-submit'
          }`}
          onClick={() => onClickMyMissionList(mission.id)}
        >
          {mission.title}
        </div>
      </Link>
    );
  };
  render() {
    const { currentUser } = this.props;

    return (
      <div className="my">
        <div className="my__title">
          <h1 className="my__title-who">
            {currentUser.missions
              ? `'${currentUser.name}'님의 미션😎`
              : '미션이 없네요😢'}
          </h1>
        </div>
        <div className="my__contents">
          {currentUser.missions.map(mission => {
            return <this.CreateMissionList mission={mission} />;
          })}
        </div>
      </div>
    );
  }
}

export default My;
