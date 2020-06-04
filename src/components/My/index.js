import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import ButtonComponent from '../common/ButtonComponent';
import ImageDetailPopup from '../common/ImageDetailPopup';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const CreatePostingBox = ({ handleClickImage, post }) => {
  return (
    <div className="post-thumbnailboxB">
      <div className="post-thumbnailboxB__top">
        <img
          className="post-thumbnailboxB__img"
          src={post.thumbnailUrlMy}
          alt={post.title}
          onClick={() => {
            handleClickImage(post.thumbnailUrlMy);
          }}
        />
      </div>
      <div className="post-thumbnailboxB__body">
        <div className="post-thumbnailboxB__title">{post.title}</div>
        <div className="post-thumbnailboxB__content">{post.content}</div>
      </div>
      <div className="post-thumbnailboxB__bottom">
        <div>
          <span className="post-thumbnailboxB__author-wrap">
            From{' '}
            <strong className="post-thumbnailboxB__author-name">
              {post.missionTitle}
            </strong>
          </span>
        </div>
        <div className="post-thumbnailboxB__date">
          {post.modifiedDate.substr(0, 10)}
        </div>
      </div>
    </div>
  );
};

const CreateMissionList = ({ mission }) => {
  return (
    <Link
      to={`my/${mission.id}`}
      className={`${mission.banned ? 'list-box--disabled' : ''}`}
    >
      <div className="list-box">
        <div className="list-box__img_wrap">
          {mission.submit ? (
            <img
              className="list-box__img"
              src={mission.thumbnailUrl}
              alt={mission.id}
            />
          ) : (
            <img
              className="list-box__img list-box__img--not-submit"
              src={mission.thumbnailUrl}
              alt={mission.id}
            />
          )}
        </div>
        <div
          className={`list-box__title ${
            mission.submit
              ? 'list-box__title--submit'
              : 'list-box__title--not-submit'
          }`}
        >
          {mission.title}
        </div>
        {mission.banned ? (
          mission.ended ? (
            <div className="list-box__footer list-box__footer--ended">
              <span role="img" aria-label="ended">
                종료된 미션입니다 ❌
              </span>
            </div>
          ) : (
            <div className="list-box__footer list-box__footer--banned">
              강퇴당한 미션입니다
            </div>
          )
        ) : mission.submit ? (
          <div className="list-box__footer list-box__footer--submit">
            <span role="img" aria-label="success">
              제출 완료 😊
            </span>
          </div>
        ) : (
          <div className="list-box__footer">제출하러 가기 → </div>
        )}
      </div>
    </Link>
  );
};

const My = ({
  currentUser,
  missions,
  handleLeftButtonClick,
  handleRightButtonClick,
  myPosts,
  numOfList,
  index,
  activePostImg,
  isPopUp,
  handleClickImage,
  handleClose,
  setBox,
}) => {
  return (
    <>
      <div className="my">
        <div className="my__title">
          <h1 className="my__title-who">
            {currentUser.missions.length ? (
              <Link to={'/my/edit'}>
                {currentUser.name}님의 미션
                <span role="img" aria-label="sunglassman">
                  😎
                </span>
              </Link>
            ) : (
              '미션이 없네요😢'
            )}
          </h1>
        </div>
        <div className="my__contents" ref={setBox}>
          {currentUser.missions.length > numOfList && (
            <div className="my__button-wrap">
              <ButtonComponent
                icon={faChevronLeft}
                func={handleLeftButtonClick}
                disabled={index === 0 ? true : false}
              />
            </div>
          )}
          {missions.map((mission) => {
            return <CreateMissionList mission={mission} />;
          })}
          {currentUser.missions.length > numOfList && (
            <div className="my__button-wrap">
              <ButtonComponent
                icon={faChevronRight}
                func={handleRightButtonClick}
                disabled={
                  index === currentUser.missions.length - numOfList
                    ? true
                    : false
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="my__my-post">
        <div className="my-post">
          <div className="my-post__title">내가 쓴 글</div>
          <div className="my-post__post-box">
            {myPosts.length ? (
              myPosts.map((post) => (
                <CreatePostingBox
                  post={post}
                  handleClickImage={handleClickImage}
                />
              ))
            ) : (
              <div className="my-post__post-label">
                포스팅 된 미션 글이 없습니다{' '}
                <span role="img" aria-label="sad">
                  😐
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {isPopUp && (
        <ImageDetailPopup
          activePostImg={activePostImg}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default My;
