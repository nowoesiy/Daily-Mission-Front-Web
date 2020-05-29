import React from 'react';
import { lazyLoad } from '../../util/lazyLoad.js';
import Mission from '../../components/Mission';
import { connect } from 'react-redux';

class MissionListContainer extends React.Component {
  componentDidMount() {
    if (this.props.missionLists.length > 0) {
      lazyLoad();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.missionLists !== this.props.missionLists) {
      lazyLoad();
    }
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
