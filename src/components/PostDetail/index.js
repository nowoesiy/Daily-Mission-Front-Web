import React from 'react';
import './index.scss';

const post = {
  id: 'nd11',
  title: '[200301] Power of Four ',
  missionId: 3,
  missionTitle: '1일 1알고리즘',
  content:
    '설명: 주어진 수가 4의 제곱 형태인지 찾는 문제 사용 언어: C++ 난이도: ★★☆☆☆',
  user: 'nhseo302',
  userImageUrl:
    'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
  imageURL:
    'https://postfiles.pstatic.net/MjAyMDAzMDFfMjg4/MDAxNTgzMDcwNzg4MDE4.9GJteXOISkXsKwcnfSlJ17porAGTdUrV050GB2Zvikog.xhG5XRiGw-7c60T6PsjB1T_kYl67jfMZj-Un9CEW4AAg.PNG.nhseo302/image.png?type=w966',
  date: '2020-03-02',
};

const CreatePostDetailBox = ({ post }) => {
  return (
    <>
      <div className="post-detail__top">
        <div className="post-detail__from">{post.missionTitle}</div>
        <div className="post-detail__title">{post.title}</div>
        <div className="post-detail__user-wrap">
          <img className="post-detail__user-img" src={post.userImageUrl} />{' '}
          <span className="post-detail__user-name">{post.user}</span>
        </div>
      </div>
      <div className="post-detail__body">
        <div className="post-detail__content">{post.content}</div>
        <img className="post-detail__content-img" src={post.imageURL} />
      </div>
    </>
  );
};

class PostDetail extends React.Component {
  render() {
    return (
      <div className="post-detail">
        <CreatePostDetailBox post={post} />
      </div>
    );
  }
}

export default PostDetail;
