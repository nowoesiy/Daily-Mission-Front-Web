import React from 'react';
import My from '../../components/My';
import axios from 'axios';
import { connect } from 'react-redux';

class MyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: '',
      numOfList: '',
      index: 0,
      activePostImg: '',
      isPopUp: false,
    };
    this.box = React.createRef();
  }

  handleRightButtonClick = () => {
    if (
      this.state.index <
      this.props.currentUser.missions.length - this.state.numOfList
    ) {
      this.setState({
        index: this.state.index + 1,
      });
    }
  };

  handleLeftButtonClick = () => {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
      });
    }
  };

  handleReactiveList = () => {
    if (this.box.current) {
      const { clientWidth } = this.box.current;

      this.setState({
        numOfList: Math.floor((clientWidth - 100) / 300),
      });
    }
  };

  handleClickImage = (url) => {
    this.setState({
      isPopUp: !this.state.isPopUp,
      activePostImg: url,
    });
  };

  handleClose = () => {
    this.setState({
      activePostImg: '',
      isPopUp: false,
    });
  };

  componentDidMount() {
    this.handleReactiveList();

    window.addEventListener('resize', this.handleReactiveList);

    axios
      .get('https://api.daily-mission.com/api/post/all/me', {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        this.setState({
          myPosts: response.data,
        });
      });
  }

  render() {
    const { currentUser } = this.props;
    const { myPosts, isPopUp, index, numOfList, activePostImg } = this.state;

    const missions = currentUser.missions.slice(
      this.state.index,
      this.state.numOfList + this.state.index,
    );

    return (
      <My
        currentUser={currentUser}
        missions={missions}
        handleLeftButtonClick={this.handleLeftButtonClick}
        handleRightButtonClick={this.handleRightButtonClick}
        handleClickImage={this.handleClickImage}
        handleClose={this.handleClose}
        index={index}
        numOfList={numOfList}
        myPosts={myPosts}
        isPopUp={isPopUp}
        activePostImg={activePostImg}
        setBox={this.box}
      />
    );
  }
}

export default connect(
  (state) => ({
    currentUser: state.loginAuth.currentUser,
  }),
  {},
)(MyContainer);
