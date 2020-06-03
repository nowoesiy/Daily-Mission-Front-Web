import React from 'react';
import { lazyLoad } from '../../lib/lazyLoad.js';
import Mission from '../../components/Mission';
import { getMissionList } from '../../modules/reducer_mission';
import { connect } from 'react-redux';
import { fetchScroll } from '../../lib/fetchScroll.js';

class MissionListContainer extends React.Component {
  state = {
    numOfMission: 12,
  };

  addMissions = () => {
    this.setState({
      numOfMission: this.state.numOfMission + 12,
    });
    lazyLoad();
  };

  componentDidMount() {
    this.props.getMissionList();
    if (this.props.missionLists.length > 0) {
      lazyLoad();
    }
    fetchScroll(this.addMissions);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.missionLists !== this.props.missionLists) {
      lazyLoad();
    }
  }

  render() {
    const { numOfMission } = this.state;
    const missionLists = this.props.missionLists.slice(0, numOfMission);
    return <Mission missions={missionLists} />;
  }
}

export default connect(
  (state) => ({
    missionLists: state.MissionReducer.missions,
  }),
  { getMissionList },
)(MissionListContainer);
