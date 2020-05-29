import React from 'react';
import { connect } from 'react-redux';
import Landing from '../../components/Landing';

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
    if (this.box) {
      const { clientWidth } = this.box.current;
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
    const { hotMissionIndex, newMissionIndex, numOfList } = this.state;

    const hotMissionsReduce = this.props.hotMissions.slice(
      hotMissionIndex,
      numOfList + hotMissionIndex,
    );

    const checkNavigator = this.props.hotMissions.length > numOfList;
    const checkDisable =
      hotMissionIndex >= this.props.hotMissions.length - numOfList;
    const newMissionsReduce = this.props.newMissions.slice(
      newMissionIndex,
      numOfList + newMissionIndex,
    );
    return (
      <Landing
        hotMissions={hotMissionsReduce}
        missions={newMissionsReduce}
        handleSwiperLeftClick={this.handleSwiperLeftClick}
        handleSwiperRightClick={this.handleSwiperRightClick}
        handleSwiperNewLeftClick={this.handleSwiperNewLeftClick}
        handleSwiperNewRightClick={this.handleSwiperNewRightClick}
        hotMissionIndex={hotMissionIndex}
        newMissionIndex={newMissionIndex}
        numOfList={numOfList}
        checkNavigator={checkNavigator}
        checkDisable={checkDisable}
        setBox={this.box}
      />
    );
  }
}

export default connect(
  (state) => ({
    newMissions: state.MissionReducer.homeMissions,
    hotMissions: state.MissionReducer.hotMissions,
  }),
  {},
)(LandingContainer);
