import React from 'react';
import { lazyLoad } from '../../util/lazyLoad.js';
import Mission from '../../components/Mission';
import { connect } from 'react-redux';
class MissionListContainer extends React.Component {
  componentDidMount() {
    lazyLoad();
  }

  render() {
    const { missionLists } = this.props;
    return <Mission missions={missionLists} />;
  }
}

export default connect(
  (state) => ({
    missionLists: state.MissionReducer.missions,
  }),
  {},
)(MissionListContainer);
