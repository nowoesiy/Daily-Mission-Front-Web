import React from 'react';
import { connect } from 'react-redux';
import Landing from '../../components/Landing';

class LandingContainer extends React.Component {
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

  render() {
    const { newMissions, hotMissions } = this.props;
    return <Landing hotMissions={hotMissions} missions={newMissions} />;
  }
}

export default connect(
  (state) => ({
    newMissions: state.MissionReducer.homeMissions,
    hotMissions: state.MissionReducer.hotMissions,
  }),
  {},
)(LandingContainer);
