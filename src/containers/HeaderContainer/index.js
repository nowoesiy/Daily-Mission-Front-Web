import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Alert from '../../components/Alert';
import {
  postMission,
  closetAttendCodeMessage,
} from '../../modules/reducer_mission';
import { handleLogout } from '../../modules/reduer_loginAuth';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.box = React.createRef();
    this.state = {
      profileToggle: false,
    };
  }

  handleProfileClick = () => {
    this.setState({
      profileToggle: !this.state.profileToggle,
    });
  };

  handleProfileOutSideClick = (e) => {
    if (this.box.current && !this.box.current.contains(e.target)) {
      this.setState({
        profileToggle: false,
      });
    }
  };
  componentDidMount() {
    document.addEventListener('mousedown', this.handleProfileOutSideClick);
  }

  render() {
    const { attendCode, closetAttendCodeMessage } = this.props;
    return (
      <>
        {attendCode && (
          <Alert
            title={'미션 생성 성공'}
            text={'해당 미션의 참여코드는 \n' + attendCode + '입니다.'}
            func={closetAttendCodeMessage}
          />
        )}
        <Header
          {...this.props}
          {...this.state}
          handleProfileClick={this.handleProfileClick}
          boxRef={this.box}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    authenticated: state.loginAuth.authenticated,
    currentUser: state.loginAuth.currentUser,
    attendCode: state.MissionReducer.attendCode,
  }),
  {
    closetAttendCodeMessage,
    postMission,
    handleLogout,
  },
)(HeaderContainer);
