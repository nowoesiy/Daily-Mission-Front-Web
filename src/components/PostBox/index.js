import React from 'react';
import './index.scss';
import ImageDetailPopup from '../ImageDetailPopup';

const CreatePostingBox = ({ post }) => {
  return (
    <div className="post-box">
      <div className="post-box__top">
        <img
          className="lazy post-box__img"
          data-src={post.thumbnailUrl}
          alt={post.title}
        />
      </div>
      <div className="post-box__body">
        <div className="post-box__title">{post.title}</div>
        <div className="post-box__content">{post.content}</div>
      </div>
      <div className="post-box__bottom">
        <div>
          <span className="post-box__author-wrap">
            <img
              className="post-box__author-img"
              src={post.userThumbnailUrl}
              alt={post.userName}
            />
            By{' '}
            <strong className="post-box__author-name">{post.userName}</strong>
          </span>
          <span className="post-box__from">
            {' '}
            From{' '}
            <strong className="post-box__author-name">
              {post.missionTitle}
            </strong>
          </span>
        </div>
        <div className="post-box__date">{post.modifiedDate.substr(0, 10)}</div>
      </div>
    </div>
  );
};

const PostBox = (props) => {
  const { posts, isPopUp, activePostImg, handleClose } = props;

  return (
    <div className="post">
      <div className="post__upper-text">📃 포스팅</div>
      <div className="post__list-wrap">
        {posts
          ? posts.map((post) => (
              <CreatePostingBox key={post.postId} post={post} />
            ))
          : 'Loading'}
      </div>
      {isPopUp && (
        <ImageDetailPopup
          activePostImg={activePostImg}
          handleClose={handleClose}
        />
      )}
      <div className="scroll-detector"></div>
    </div>
  );
};

export default PostBox;
