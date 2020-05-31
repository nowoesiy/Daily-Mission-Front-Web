import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { postBoard } from '../../modules/reducer_submitPost';
import { withRouter } from 'react-router-dom';
import Submit from '../../components/Submit';

class SubmitContainer extends React.Component {
  state = {
    isPostPopup: false,
    weekDates: [],
    histories: [],
    file: '',
    fileName: '',
    activeMyMission: '',
    activeMissionId: '',
  };

  handleDrop = (file) => {
    this.setState({
      file: file[0],
      isPostPopup: true,
    });
  };

  handlePopUp = () => {
    this.setState({
      isPostPopup: !this.state.isPostPopup,
      file: '',
    });
  };

  handleClickFile = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  getMissionDetail = () => {
    axios
      .get(
        `https://api.daily-mission.com/api/post/schedule/mission/${this.props.match.params.id}/week/0`,
      )
      .then((response) => {
        this.setState({
          histories: response.data.histories,
          weekDates: response.data.weekDates,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.activeMissionId)
      return {
        activeMissionId: nextProps.match.params.id,
        activeMyMission: nextProps.currentUser.missions.filter(
          (mission) => mission.id === parseInt(nextProps.match.params.id),
        )[0],
      };
    else return null;
  }

  componentDidMount() {
    const { activeMyMission } = this.state;
    if (activeMyMission && activeMyMission.banned) {
      this.props.history.push('/my');
    }

    this.getMissionDetail();
  }

  render() {
    const { postBoard } = this.props;
    const {
      isPostPopup,
      file,
      fileName,
      activeMyMission,
      weekDates,
      histories,
    } = this.state;
    if (!activeMyMission) return <div></div>;
    return (
      <Submit
        activeMyMission={activeMyMission}
        weekDates={weekDates}
        histories={histories}
        file={file}
        fileName={fileName}
        isPostPopup={isPostPopup}
        postBoard={postBoard}
        handleDrop={this.handleDrop}
        handlePopUp={this.handlePopUp}
        handleClickFile={this.handleClickFile}
      />
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMissionId } = this.state;
    const { currentUser } = this.props;
    if (activeMissionId !== prevState.activeMissionId) {
      this.setState({
        activeMyMission: currentUser.missions.filter(
          (mission) => mission.id === activeMissionId,
        )[0],
      });

      this.getMissionDetail();
    }
    if (currentUser.missions !== prevProps.currentUser.missions) {
      const activeMyMission = currentUser.missions.filter(
        (mission) => mission.id === activeMissionId,
      )[0];

      this.setState({
        activeMyMission,
      });

      this.getMissionDetail();
    }
  }
}

export default withRouter(
  connect(
    (state) => ({
      currentUser: state.loginAuth.currentUser,
    }),
    {
      postBoard,
    },
  )(SubmitContainer),
);
