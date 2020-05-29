import React from 'react';
import { connect } from 'react-redux';
import Aside from '../../components/Aside';
import { onClickMyMissionList } from '../../modules/reducer_mission';

class AsideContainer extends React.Component {
  state = {
    isMyNavVisible: false,
  };

  toggleBox = (e) => {
    this.setState((prevState) => ({
      isMyNavVisible: !prevState.isMyNavVisible,
    }));
    e.preventDefault();
  };

  render() {
    const { currentUser, onClickMyMissionList } = this.props;
    const { isMyNavVisible } = this.state;
    return (
      <Aside
        currentUser={currentUser}
        onClickMyMissionList={onClickMyMissionList}
        toggleBox={this.toggleBox}
        isMyNavVisible={isMyNavVisible}
      />
    );
  }
}

export default connect(
  (state) => ({ currentUser: state.loginAuth.currentUser }),
  { onClickMyMissionList },
)(AsideContainer);
