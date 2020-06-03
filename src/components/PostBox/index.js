import React from 'react';
import './index.scss';
import ImageDetailPopup from '../common/ImageDetailPopup';

const CreatePostingBox = ({ post }) => {
  return (
    <article className="post-box">
      <div className="post-box__top">
        <img
          className="lazy post-box__img"
          data-src={post.thumbnailUrl}
          alt={post.title}
        />
      </div>
      <div className="post-box__body">
        <h2 className="post-box__title">{post.title}</h2>
        <p className="post-box__content">{post.content}</p>
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
        <span className="post-box__date">
          {post.modifiedDate.substr(0, 10)}
        </span>
      </div>
    </article>
  );
};

const PostBox = ({ posts, isPopUp, activePostImg, handleClose }) => {
  return (
    <section className="post">
      <h1 className="post__upper-text">
        <span role="img" aria-label="postring">
          📃
        </span>{' '}
        포스팅
      </h1>
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
    </section>
  );
};

export default PostBox;
