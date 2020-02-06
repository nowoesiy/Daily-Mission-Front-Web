import React from 'react';
import './index.css';
import Header from '../Header';
import Aside from '../Aside';
import Submit from '../Submit';
import Mission from '../Mission';
import axios from 'axios';

class App extends React.Component {
  state = {
    team: [
      {
        id: '이수백',
        img:
          'https://blogfiles.pstatic.net/MjAyMDAyMDNfNDIg/MDAxNTgwNzE3OTc2MDAy.2LFTETNFNTCyIMmWYZISOSPt_t0wf4UfDtJzPtXwfGAg.TTAoaSPFyE81V3CUDhYsoO6VqLOxEEPX3rys-0m6McIg.JPEG.nhseo302/KakaoTalk_20200203_171847170.jpg',
        submit: false,
        date: '2020-02-03 17:10:00',
      },
      {
        id: '이서원',
        img:
          'https://blogfiles.pstatic.net/MjAyMDAyMDNfMTYy/MDAxNTgwNzE4MDQ1NjI0.llYyVbPN1Ed_vPtL0jYYmd5rTVKOLQhZPVncn5AoleMg.LnJFEu8E-Ui7eDJnXoAdOpgAJoE3UA2gnnBU-TMLjPAg.JPEG.nhseo302/20180328_152020.jpg',
        submit: false,
        date: '2020-02-03 17:10:00',
      },
      {
        id: '이민호',
        img:
          'https://blogfiles.pstatic.net/MjAyMDAyMDNfMjI0/MDAxNTgwNzE3OTc1MzY0.0IH684guoAWFxv5L8GGJR9WOqgtgwu9UawFv0-r6vtgg.anL8iNCD90YJxcH7LRZiJPcB4jN0GYoUUxegjXM59k8g.JPEG.nhseo302/KakaoTalk_20200203_171545338.jpg',
        submit: false,
        date: '2020-02-03 17:10:00',
      },
    ],
    posts: [],
    posting: [],
    inputValue: '',
    inputValue2: '',
  };

  updateInputValue = e => {
    if (e.target.name === 'content') {
      this.setState({
        inputValue2: e.target.value,
      });
    } else {
      this.setState({
        inputValue: e.target.value,
      });
    }
  };

  getBoard = async () => {
    const response = await axios.get('http://13.125.252.144/api/posts/1');
    console.log(response.data);

    this.setState({
      posts: response.data,
    });
  };

  PostBoard = () => {
    axios
      .post('http://13.125.252.144/api/posts', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        title: this.state.inputValue,
        content: this.state.inputValue2,
        author: '이수백',
      })
      .then(response => {
        console.log('response', JSON.stringify(response, null, 2));
      })
      .catch(error => {
        console.log('failed', error);
      });
  };

  DeleteBoard = () => {
    axios.delete('http://13.125.252.144/api/posts/10', { crossdomain: true });
  };
  componentDidMount() {
    this.getBoard();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Aside />
        <div className="container">
          <Submit
            team={this.state.team}
            posts={this.state.posts}
            inputValue={this.state.inputValue}
            inputValue2={this.state.inputValue2}
            updateInputValue={this.updateInputValue}
            PostBoard={this.PostBoard}
            DeleteBoard={this.DeleteBoard}
          />
          <Mission />
        </div>
      </div>
    );
  }
}

export default App;
