import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../modules/reducer_ReadPost';
import PostBox from '../../components/PostBox';
import { lazyLoad } from '../../lib/lazyLoad.js';
import { fetchScroll } from '../../lib/fetchScroll.js';

class Post extends React.Component {
  state = {
    numOfPosts: 3,
    activePostImg: '',
    isPopUp: false,
  };

  addPosts = () => {
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

  handleClickImage = (src) => {
    this.setState({
      isPopUp: !this.state.isPopUp,
      activePostImg: src,
    });
  };

  componentDidMount() {
    this.props.fetchPosts();
    fetchScroll(this.addPosts);
  }

  render() {
    const { numOfPosts, isPopUp, activePostImg } = this.state;
    let posts = this.props.posts.slice(0, numOfPosts);

    return (
      <PostBox
        posts={posts}
        isPopUp={isPopUp}
        activePostImg={activePostImg}
        handleClickImage={this.handleClickImage}
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
