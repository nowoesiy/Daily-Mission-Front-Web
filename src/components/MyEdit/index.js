import React from 'react';
import './index.scss';

const MyEdit = ({
  tempUser,
  isNameEdit,
  handleChangeImage,
  handleChangeName,
  handleEditName,
  postUpdatedProfile,
}) => {
  if (!tempUser) return <div></div>;
  return (
    <div className="my-edit">
      <div className="my-edit__profile-default">
        <div className="profile-default__left">
          <input
            id="profile"
            type="file"
            style={{ display: 'none' }}
            onChange={handleChangeImage}
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
                onChange={handleChangeName}
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
            onClick={!isNameEdit ? handleEditName : postUpdatedProfile}
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
};

export default MyEdit;
