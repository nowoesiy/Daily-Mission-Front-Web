import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  postAttednigMission,
  closetAttendModal,
} from '../../modules/reducer_mission';
import { fetchScroll } from '../../lib/fetchScroll.js';
import { lazyLoad } from '../../lib/lazyLoad';
import MissionDetail from '../../components/MissionDetail';
import PostBoxSmall from '../../components/common/PostBoxSmall';
import ParticipantBox from '../../components/common/ParticipantBox';

class MissionDetailContainer extends React.Component {
  state = {
    mission: '',
    missionPost: '',
    numOfPosts: 12,
    isAttendPopup: false,
    inputPasswordMode: false,
    password: '',
    isPopUp: false,
    activePostImg: '',
  };

  handleClose = () => {
    this.setState({
      activePostImg: '',
      isPopUp: false,
    });
  };

  handleClickImage = (url) => {
    this.setState({
      isPopUp: !this.state.isPopUp,
      activePostImg: url,
    });
  };

  handleOnClickPopUp = () => {
    this.setState({
      isAttendPopup: !this.state.isAttendPopup,
      password: '',
    });
  };

  handleInputChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  getMissionInfo = () => {
    axios
      .get(
        `https://api.daily-mission.com/api/mission/${this.props.match.params.id}`,
      )
      .then((response) => {
        this.setState({
          mission: response.data,
        });
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };

  getMissionPosting = () => {
    axios
      .get(
        `https://api.daily-mission.com/api/post/all/mission/${this.props.match.params.id}`,
      )
      .then((response) => {
        this.setState({
          missionPost: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addPosts = () => {
    this.setState({
      numOfPosts: this.state.numOfPosts + 12,
    });
    lazyLoad();
  };

  componentDidMount() {
    this.getMissionInfo();
    this.getMissionPosting();
    fetchScroll(this.addPosts);
  }

  componentDidUpdate(prevProps, prevState) {
    fetchScroll(this.addPosts);
    lazyLoad();

    if (prevProps.currentUser !== null) {
      const { currentUser } = this.props;

      if (
        currentUser.missions.length !== prevProps.currentUser.missions.length
      ) {
        this.getMissionInfo();
        this.getMissionPosting();
      }
    }
  }
  render() {
    const {
      currentUser,
      isPasswordRight,
      postAttednigMission,
      closetAttendModal,
    } = this.props;

    const {
      mission,
      password,
      isPopUp,
      activePostImg,
      isAttendPopup,
      numOfPosts,
    } = this.state;

    const missionPost = this.state.missionPost.slice(0, numOfPosts);
    return (
      <>
        <MissionDetail
          postAttednigMission={postAttednigMission}
          currentUser={currentUser}
          closetAttendModal={closetAttendModal}
          isPasswordRight={isPasswordRight}
          mission={mission}
          password={password}
          isAttendPopup={isAttendPopup}
          handleOnClickPopUp={this.handleOnClickPopUp}
          handleInputChange={this.handleInputChange}
        />
        <ParticipantBox mission={mission} />
        <PostBoxSmall
          missionPost={missionPost}
          handleClickImage={this.handleClickImage}
          handleClose={this.handleClose}
          isPopUp={isPopUp}
          activePostImg={activePostImg}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    currentUser: state.loginAuth.currentUser,
    isPasswordRight: state.MissionReducer.isPasswordRight,
  }),
  { postAttednigMission, closetAttendModal },
)(MissionDetailContainer);
