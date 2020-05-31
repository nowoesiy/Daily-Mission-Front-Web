import React from 'react';
import { connect } from 'react-redux';
import Landing from '../../components/Landing';
import {
  getHomeMissionList,
  getHotMissionList,
} from '../../modules/reducer_mission';
class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.box = React.createRef();
    this.state = {
      hotMissionIndex: 0,
      newMissionIndex: 0,
      numOfList: '',
    };
  }

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
      this.props.newMissions.length - this.state.numOfList
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
    if (this.box.current) {
      const { clientWidth } = this.box.current;
      this.setState({
        numOfList: clientWidth / 365,
      });
    }
  };

  componentDidMount() {
    const { getHomeMissionList, getHotMissionList } = this.props;
    getHomeMissionList();
    getHotMissionList();
    this.handleReactiveList();
    window.addEventListener('resize', this.handleReactiveList);
  }

  render() {
    const { hotMissionIndex, newMissionIndex, numOfList } = this.state;

    const hotMissionsReduce = this.props.hotMissions.slice(
      hotMissionIndex,
      numOfList + hotMissionIndex,
    );

    const checkHotNavigator = this.props.hotMissions.length > numOfList;
    const checkHotDisable =
      hotMissionIndex >= this.props.hotMissions.length - numOfList;

    const newMissionsReduce = this.props.newMissions.slice(
      newMissionIndex,
      numOfList + newMissionIndex,
    );

    const checkNewNavigator = this.props.newMissions.length > numOfList;
    const checkNewDisable =
      newMissionIndex >= this.props.newMissions.length - numOfList;

    return (
      <>
        <Landing
          missions={hotMissionsReduce}
          handleSwiperLeftClick={this.handleSwiperLeftClick}
          handleSwiperRightClick={this.handleSwiperRightClick}
          MissionIndex={hotMissionIndex}
          checkNavigator={checkHotNavigator}
          checkDisable={checkHotDisable}
          setBox={this.box}
          title={'🔥 Hot한 미션'}
          type={'hot'}
        />
        <Landing
          missions={newMissionsReduce}
          handleSwiperLeftClick={this.handleSwiperNewLeftClick}
          handleSwiperRightClick={this.handleSwiperNewRightClick}
          MissionIndex={newMissionIndex}
          checkNavigator={checkNewNavigator}
          checkDisable={checkNewDisable}
          title={'✌ 신규 미션'}
          type={'new'}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    newMissions: state.MissionReducer.homeMissions,
    hotMissions: state.MissionReducer.hotMissions,
  }),
  { getHomeMissionList, getHotMissionList },
)(LandingContainer);
