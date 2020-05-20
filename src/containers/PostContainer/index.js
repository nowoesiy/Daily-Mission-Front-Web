import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPosts } from '../../modules/reducer_ReadPost';
import PostBox from '../../components/PostBox';
import { lazyLoad } from '../../util/lazyLoad.js';
import { fetchScroll } from '../../util/fetchScroll.js';

class Post extends React.Component {
  state = {
    numOfPosts: 3,
    activePostImg: '',
    isPopUp: false,
  };

  fetchPosts = () => {
    this.setState({
      numOfPosts: this.state.numOfPosts + 3,
    });
    lazyLoad();
  };

  handleClose = () => {
    this.setState({
      activePostImg: '',
      isPopUp: false,
    });
  };

  componentDidMount() {
    window.addEventListener('click', (e) => {
      const path = e.path;
      const image = path.find((p) => p.className === 'post-box__img');

      if (image) {
        this.setState({
          isPopUp: !this.state.isPopUp,
          activePostImg: image.src,
        });
      }
    });
    this.props.fetchPosts();
    fetchScroll(this.fetchPosts);
  }

  render() {
    const { numOfPosts, isPopUp, activePostImg } = this.state;
    let posts = this.props.posts.slice(0, numOfPosts);

    return (
      <PostBox
        posts={posts}
        isPopUp={isPopUp}
        activePostImg={activePostImg}
        handleClose={this.handleClose}
      />
    );
  }
}

export default connect(
  (state) => ({
    posts: state.PostReducer.posts,
  }),
  {
    fetchPosts,
  },
)(Post);
