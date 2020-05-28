import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../ButtonComponent';

class Landing extends React.Component {
  state = {
    hotMissionIndex: 0,
    newMissionIndex: 0,
    numOfList: '',
  };

  handleSwiperRightClick = () => {
    if (
      this.state.hotMissionIndex <
      this.props.hotMissions.length - this.state.numOfList
    ) {
      this.setState({
        hotMissionIndex: this.state.hotMissionIndex + 1,
      });
    }
  };

  handleSwiperLeftClick = () => {
    if (this.state.hotMissionIndex > 0) {
      this.setState({
        hotMissionIndex: this.state.hotMissionIndex - 1,
      });
    }
  };

  handleSwiperNewRightClick = () => {
    if (
      this.state.newMissionIndex <
      this.props.missions.length - this.state.numOfList
    ) {
      this.setState({
        newMissionIndex: this.state.newMissionIndex + 1,
      });
    }
  };

  handleSwiperNewLeftClick = () => {
    if (this.state.newMissionIndex > 0) {
      this.setState({
        newMissionIndex: this.state.newMissionIndex - 1,
      });
    }
  };

  handleReactiveList = () => {
    if (this.box) {
      const { clientWidth } = this.box;

      this.setState({
        numOfList: clientWidth / 365,
      });
    }
  };

  componentDidMount() {
    this.handleReactiveList();

    window.addEventListener('resize', this.handleReactiveList);
  }

  popularMissionBox = ({ mission, type }) => {
    return mission.map((m) => {
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

  render() {
    const { missions, hotMissions } = this.props;
    const { newMissionIndex, hotMissionIndex, numOfList } = this.state;
    const missionsReduce = missions.slice(
      newMissionIndex,
      numOfList + newMissionIndex,
    );

    const hotMissionsReduce = hotMissions.slice(
      hotMissionIndex,
      numOfList + hotMissionIndex,
    );
    return (
      <div className="landing">
        <div className="landing__popular-text">🔥 Hot한 미션</div>

        <div
          className="landing__popular-box"
          ref={(ref) => {
            this.box = ref;
          }}
        >
          <div className="landing__button-wrap">
            {hotMissions.length > this.state.numOfList && (
              <ButtonComponent
                icon={faChevronLeft}
                func={this.handleSwiperLeftClick}
                disabled={this.state.hotMissionIndex === 0 ? true : false}
              />
            )}
          </div>
          <this.popularMissionBox type={'hot'} mission={hotMissionsReduce} />
          <div className="landing__button-wrap">
            {hotMissions.length > this.state.numOfList && (
              <ButtonComponent
                icon={faChevronRight}
                func={this.handleSwiperRightClick}
                disabled={
                  this.state.hotMissionIndex >=
                  hotMissions.length - this.state.numOfList
                    ? true
                    : false
                }
              />
            )}
          </div>
        </div>

        <div className="landing__new-text">✌ 신규 미션</div>
        <div className="landing__popular-box">
          <div className="landing__button-wrap">
            {missions.length > this.state.numOfList && (
              <ButtonComponent
                icon={faChevronLeft}
                func={this.handleSwiperNewLeftClick}
                disabled={this.state.newMissionIndex === 0 ? true : false}
              />
            )}
          </div>
          <this.popularMissionBox type={'new'} mission={missionsReduce} />
          <div className="landing__button-wrap">
            {missions.length > this.state.numOfList && (
              <ButtonComponent
                icon={faChevronRight}
                func={this.handleSwiperNewRightClick}
                disabled={
                  this.state.newMissionIndex ===
                  missions.length - this.state.numOfList
                    ? true
                    : false
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
