import React from 'react';
import './index.scss';
import ImageDetailPopup from '../ImageDetailPopup';

const CreatePostingBox = ({ handleClickImage, post }) => {
  return (
    <div className="post-thumbnailbox">
      <div className="post-thumbnailbox__top">
        <img
          className="lazy post-thumbnailbox__img"
          data-src={post.thumbnailUrlMission}
          onClick={() => {
            handleClickImage(post.thumbnailUrlMission);
          }}
          alt={post.id}
        />
      </div>
      <div className="post-thumbnailbox__body">
        <div className="post-thumbnailbox__title">{post.title}</div>
        <div className="post-thumbnailbox__content">{post.content}</div>
      </div>
      <div className="post-thumbnailbox__bottom">
        <div>
          <span className="post-thumbnailbox__author-wrap">
            <img
              className="post-thumbnailbox__author-img"
              src={post.userThumbnailUrl}
              alt={post.userName}
            />
            By{' '}
            <strong className="post-thumbnailbox__author-name">
              {post.userName}
            </strong>
          </span>
        </div>
        <div className="post-thumbnailbox__date">
          {post.modifiedDate.substr(0, 10)}
        </div>
      </div>
    </div>
  );
};

const PostBoxSmall = ({
  missionPost,
  handleClickImage,
  isPopUp,
  activePostImg,
  handleClose,
}) => {
  if (!missionPost.length) {
    return (
      <>
        <div className="detail-info__post-wrap">
          <div className="detail-info__post-label">
            미션 포스트가 없습니다 😐
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="detail-info__post-title">포스팅</div>
        <div className="detail-info__post-wrap">
          {missionPost.map((post) => (
            <CreatePostingBox
              key={post.postId}
              post={post}
              handleClickImage={handleClickImage}
            />
          ))}
        </div>
        <div className="scroll-detector"></div>
        {isPopUp && (
          <ImageDetailPopup
            handleClose={handleClose}
            activePostImg={activePostImg}
          />
        )}
      </>
    );
  }
};

export default PostBoxSmall;
