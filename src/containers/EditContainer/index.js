import React from 'react';
import axios from 'axios';
import MyEdit from '../../components/MyEdit';
import { LoadToGetCurrentUser } from '../../modules/reduer_loginAuth';
import { connect } from 'react-redux';

class EditContainer extends React.Component {
  state = {
    isNameEdit: false,
    tempUser: null,
    imagefile: null,
  };

  handleEditName = () => {
    this.setState({
      isNameEdit: !this.state.isNameEdit,
    });
  };

  handleChangeName = (e) => {
    this.setState({
      tempUser: { ...this.state.tempUser, name: e.target.value },
    });
  };

  handleChangeImage = (e) => {
    this.setState(
      {
        imagefile: e.target.files[0],
        tempUser: {
          ...this.state.tempUser,
          thumbnailUrlUserInfo: URL.createObjectURL(e.target.files[0]),
        },
      },
      () => {
        this.postUpdatedProfile();
      },
    );
  };

  postUpdatedProfile = () => {
    const { tempUser, imagefile } = this.state;

    const formData = new FormData();

    formData.set('userName', tempUser.name);
    if (imagefile != null) {
      formData.set('file', imagefile);
    }

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    axios
      .post('https://api.daily-mission.com/user/me/update', formData, config)
      .then(() => {
        this.setState({
          isNameEdit: false,
        });
        this.props.LoadToGetCurrentUser();
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };

  componentDidMount() {
    this.setState({
      tempUser: this.props.currentUser,
    });
    //pgetDeprive로 바꾸기(4/1)
  }

  render() {
    const { tempUser, isNameEdit } = this.state;
    return (
      <MyEdit
        tempUser={tempUser}
        isNameEdit={isNameEdit}
        handleEditName={this.handleEditName}
        handleChangeName={this.handleChangeName}
        handleChangeImage={this.handleChangeImage}
        postUpdatedProfile={this.postUpdatedProfile}
      />
    );
  }
}

export default connect(
  (state) => ({
    currentUser: state.loginAuth.currentUser,
  }),
  { LoadToGetCurrentUser },
)(EditContainer);
