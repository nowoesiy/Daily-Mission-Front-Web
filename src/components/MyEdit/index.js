import React from 'react';
import './index.scss';
import axios from 'axios';

class MyEdit extends React.Component {
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

  handleChangeName = e => {
    this.setState({
      tempUser: { ...this.state.tempUser, name: e.target.value },
    });
  };

  handleChangeImage = e => {
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

    //formData.set('id', tempUser.id);
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
      .catch(error => {
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
    if (!tempUser) return <div></div>;
    return (
      <div className="my-edit">
        <div className="my-edit__profile-default">
          <div className="profile-default__left">
            <input
              id="profile"
              type="file"
              style={{ display: 'none' }}
              onChange={this.handleChangeImage}
            />
            <label for="profile">
              <img
                className="profile-default__image"
                src={tempUser.thumbnailUrlUserInfo}
                alt={tempUser.name}
              />
            </label>
            <p className="profile-default__image-label">
              사진을 클릭해 이미지를 바꿔주세요
            </p>
          </div>
          <div className="profile-default__right">
            {isNameEdit ? (
              <>
                <input
                  className="profile-default__name-input"
                  type="text"
                  value={tempUser.name}
                  onChange={this.handleChangeName}
                  maxlength="20"
                />
                <label className="profile-default__name-label">
                  {tempUser.name.length > 20 || tempUser.name.length < 1
                    ? '닉네임을 1~20자로 설정해 주세요'
                    : ''}
                </label>
              </>
            ) : (
              <>
                <div className="profile-default__name">{tempUser.name}</div>
              </>
            )}
            <div className="profile-default__email">{tempUser.email}</div>
            <button
              onClick={
                !isNameEdit ? this.handleEditName : this.postUpdatedProfile
              }
              className={`${
                isNameEdit
                  ? `profile-default__button profile-default__button--${
                      tempUser.name.length > 20 || tempUser.name.length < 1
                        ? 'error'
                        : 'save'
                    }`
                  : 'profile-default__button profile-default__button--edit'
              }`}
              disabled={!tempUser.name}
            >
              {isNameEdit ? '저장' : '수정'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyEdit;
