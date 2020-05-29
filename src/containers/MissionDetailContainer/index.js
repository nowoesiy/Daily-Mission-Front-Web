import React from 'react';
import { connect } from 'react-redux';
import {
  postAttednigMission,
  closetAttendModal,
} from '../../modules/reducer_mission';
import MissionDetail from '../../components/MissionDetail';

class MissionDetailContainer extends React.Component {
  render() {
    return <MissionDetail />;
  }
}

export default connect(
  (state) => ({
    currentUser: state.loginAuth.currentUser,
    isPasswordRight: state.MissionReducer.isPasswordRight,
  }),
  { postAttednigMission, closetAttendModal },
)(MissionDetailContainer);
