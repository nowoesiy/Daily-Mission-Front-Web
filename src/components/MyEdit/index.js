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
          thumbnailUrl: URL.createObjectURL(e.target.files[0]),
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

    formData.set('id', tempUser.id);
    formData.set('userName', tempUser.name);
    if (imagefile != null) {
      formData.set('file', imagefile);
    }
    console.log(tempUser.id);
    console.log(tempUser.name);
    console.log(imagefile);

    console.log(formData);

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    axios
      .post('https://api.daily-mission.com/user/me/update', formData, config)
      .then(() => {
        console.log('--------------------> 프로필 업데이트 성공');
        this.setState({
          isNameEdit: false,
        });
      })
      .catch(error => {
        console.log('failed', error);
      });
  };

  componentDidMount() {
    this.setState({
      tempUser: this.props.currentUser,
    });
  }

  render() {
    const { tempUser, isNameEdit } = this.state;
    if (!tempUser) return <div>로딩중</div>;
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
                src={tempUser.thumbnailUrl}
                alt={tempUser.name}
              />
            </label>
            <p className="profile-default__image-label">
              사진을 클릭해 이미지를 바꿔주세요
            </p>
          </div>
          <div className="profile-default__right">
            {isNameEdit ? (
              <input
                className="profile-default__name-input"
                type="text"
                value={tempUser.name}
                onChange={this.handleChangeName}
              />
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
                  ? 'profile-default__button profile-default__button--save'
                  : 'profile-default__button profile-default__button--edit'
              }`}
            >
              {isNameEdit ? '저장' : '수정'}
            </button>
          </div>
        </div>
        {/* <button
            className="my-edit__confirm-btn"
            onClick={this.postUpdatedProfile}
          >
            최종 수정
          </button> */}
      </div>
    );
  }
}

export default MyEdit;
