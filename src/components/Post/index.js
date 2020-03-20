import React from 'react';
import './index.scss';
import Axios from 'axios';
import ImageDetailPopup from '../ImageDetailPopup';

// const posts = [
//   {
//     id: '123L',
//     missionId: 3,
//     missionTitle: '매일 매일 운동하기',
//     title: 'minholee93',
//     content: 'minholee93',
//     author: 'minholee93',
//     imageURL:
//       'https://mumbrella.com.au/wp-content/uploads/2018/07/Australia-Post-red-post-box.jpeg',
//     date: '2020-03-02',
//   },
//   {
//     id: '3343',
//     missionId: 3,
//     missionTitle: '매일 매일 운동하기',
//     title: '이번미션은,,,',
//     content: '데일리 미션',
//     author: 'minholee93',
//     imageURL:
//       'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
//     date: '2020-03-02',
//   },
//   {
//     id: 'nd11',
//     title: '[200301] Power of Four ',
//     missionId: 3,
//     missionTitle: '1일 1알고리즘',
//     content:
//       '설명: 주어진 수가 4의 제곱 형태인지 찾는 문제 사용 언어: C++ 난이도: ★★☆☆☆',
//     author: 'nhseo302',
//     imageURL:
//       'https://postfiles.pstatic.net/MjAyMDAzMDFfMjg4/MDAxNTgzMDcwNzg4MDE4.9GJteXOISkXsKwcnfSlJ17porAGTdUrV050GB2Zvikog.xhG5XRiGw-7c60T6PsjB1T_kYl67jfMZj-Un9CEW4AAg.PNG.nhseo302/image.png?type=w966',
//     date: '2020-03-02',
//   },
// ];

const CreatePostingBox = ({ handleClickImage, post }) => {
  return (
    <div className="post-box">
      <div className="post-box__top">
        <img
          className="post-box__img"
          src={post.thumbnailUrl}
          onClick={() => {
            handleClickImage(post.imageUrl);
          }}
        />
      </div>
      <div className="post-box__body">
        <div className="post-box__title">{post.title}</div>
        <div className="post-box__content">{post.content}</div>
      </div>
      <div className="post-box__bottom">
        <div>
          <span className="post-box__author-wrap">
            <img className="post-box__author-img" src={post.userThumbnailUrl} />
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

class Post extends React.Component {
  state = {
    posts: [],
    numOfPosts: 3,
    activePostImg: '',
    isPopUp: false,
  };

  handleClickImage = imgUrl => {
    this.setState({
      isPopUp: !this.state.isPopUp,
      activePostImg: imgUrl,
    });
  };

  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
    if (scrollHeight - innerHeight - scrollTop < 100) {
      this.setState({
        numOfPosts: this.state.numOfPosts + 3,
      });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('keyup', e => {
      if (e.keyCode === '8' || e.keyCode === 27)
        this.setState({ isPopUp: false });
    });

    Axios.get('http://api.daily-mission.com/api/post/all')
      .then(response => {
        this.setState({
          posts: response.data,
        });
      })
      .catch(error => {
        console.log('failed', error);
      });
  }

  render() {
    const { numOfPosts, isPopUp, activePostImg } = this.state;
    let posts = this.state.posts.slice(0, numOfPosts);
    return (
      <div className="post">
        <div className="post__upper-text">📃 포스팅</div>
        <div className="post__list-wrap">
          {posts
            ? posts.map(post => (
                <CreatePostingBox
                  post={post}
                  handleClickImage={this.handleClickImage}
                />
              ))
            : 'Loading'}
        </div>
        {isPopUp ? (
          <ImageDetailPopup
            handleClickImage={this.handleClickImage}
            activePostImg={activePostImg}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Post;
