import React from 'react';
import './index.scss';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  handleLogin,
  handleLogout,
  LoadToGetCurrentUser,
} from '../../modules/reduer_loginAuth';
import {
  getMissionList,
  getHomeMissionList,
  getHotMissionList,
  postAttednigMission,
  onClickMyMissionList,
} from '../../modules/reducer_mission';
import OAuth2RedirectHandler from '../../oauth2/OAuth2RedirectHandler';
import Header from '../Header';
import Aside from '../Aside';
import Login from '../Login';
import Mission from '../Mission';
//import HotMission from '../HotMission';
import Post from '../Post';
//import PostDetail from '../PostDetail';
import Landing from '../Landing';
import SubmitContainer from '../../containers/SubmitContainer';
import MissionDetail from '../MissionDetail';
import My from '../My';
import MyEdit from '../MyEdit';

const currentUser = {
  id: 2,
  name: 'seowon lee',
  email: 'tjdnjs3664@gmail.com',
  thumbnailUrl:
    'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
  missions: [
    {
      id: 50,
      title: '1일 1유니온 가기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/202003111750_union_400_600.jpg',
      banned: false,
      submit: true,
      ended: false,
    },
    {
      id: 53,
      title: '1일 1아침 밥 먹기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/1%EC%9D%BC%201%EC%95%84%EC%B9%A8%20%EB%B0%A5%20%EB%A8%B9%EA%B8%B0/202003122108_maxresdefault_400_600.jpg',
      banned: false,
      submit: true,
      ended: false,
    },
    {
      id: 54,
      title: '매일 매일 운동하기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9D%BC%20%EC%9A%B4%EB%8F%99%ED%95%98%EA%B8%B0/202003122147_IE002261056_STD_400_600.jpg',
      banned: false,
      submit: false,
      ended: false,
    },
    {
      id: 55,
      title: '매일 매일 운동하기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9D%BC%20%EC%9A%B4%EB%8F%99%ED%95%98%EA%B8%B0/202003122147_IE002261056_STD_400_600.jpg',
      banned: false,
      submit: false,
      ended: false,
    },
    {
      id: 56,
      title: '매일 매일 운동하기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9D%BC%20%EC%9A%B4%EB%8F%99%ED%95%98%EA%B8%B0/202003122147_IE002261056_STD_400_600.jpg',
      banned: false,
      submit: false,
      ended: false,
    },
    {
      id: 57,
      title: '매일 매일 운동하기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9D%BC%20%EC%9A%B4%EB%8F%99%ED%95%98%EA%B8%B0/202003122147_IE002261056_STD_400_600.jpg',
      banned: false,
      submit: false,
      ended: false,
    },
    {
      id: 58,
      title: '매일 매일 운동하기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9D%BC%20%EC%9A%B4%EB%8F%99%ED%95%98%EA%B8%B0/202003122147_IE002261056_STD_400_600.jpg',
      banned: false,
      submit: false,
      ended: false,
    },
    {
      id: 59,
      title: '매일 매일 운동하기',
      thumbnailUrl:
        'https://image.daily-mission.com.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9D%BC%20%EC%9A%B4%EB%8F%99%ED%95%98%EA%B8%B0/202003122147_IE002261056_STD_400_600.jpg',
      banned: false,
      submit: false,
      ended: false,
    },
  ],
};

class App extends React.Component {
  componentDidMount() {
    this.props.LoadToGetCurrentUser();
    this.props.getMissionList();
    this.props.getHotMissionList();
    this.props.getHomeMissionList();
  }

  render() {
    const {
      authenticated,
      //currentUser,
      handleLogout,
      missions,
      homeMissions,
      hotMissions,
      onClickMyMissionList,
      activeMyMissionId,
    } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route
            path="/oauth2/redirect"
            component={OAuth2RedirectHandler}
          ></Route>
        </Switch>
        <Header
          authenticated={authenticated}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
        {this.props.location.pathname !== '/login' ? (
          <>
            <Aside
              currentUser={currentUser}
              onClickMyMissionList={onClickMyMissionList}
            />
            <div className="container">
              <Switch>
                <Route
                  path="/mission/detail/:id"
                  render={() => (
                    <MissionDetail postAttednigMission={postAttednigMission} />
                  )}
                />
                <Route
                  path="/"
                  exact
                  render={() => (
                    <Landing
                      hotMissions={hotMissions}
                      missions={homeMissions}
                    />
                  )}
                />
                <Route
                  path="/mission"
                  exact
                  render={() => <Mission missions={missions} />}
                />
                <Route path="/post" exact component={Post}></Route>
                {/* <Route path="/hot-mission" component={HotMission}></Route> */}
                {/* <Route
                  path={`/post/detail/${postId}`}
                  component={PostDetail}
                ></Route> */}
                <Route path="/my" exact>
                  {currentUser ? (
                    <My
                      onClickMyMissionList={onClickMyMissionList}
                      currentUser={currentUser}
                    />
                  ) : (
                    <Redirect to={'/'} />
                  )}
                </Route>
                <Route path="/my/edit" exact>
                  {currentUser ? (
                    <MyEdit currentUser={currentUser} />
                  ) : (
                    <Redirect to={'/'} />
                  )}
                </Route>
                <Route
                  path="/my/:id"
                  render={() =>
                    currentUser ? (
                      <SubmitContainer
                        currentUser={currentUser}
                        activeMyMissionId={activeMyMissionId}
                      />
                    ) : (
                      <Redirect to={'/'} />
                    )
                  }
                  exact
                />
              </Switch>
            </div>
          </>
        ) : (
          <div className="App__login">
            <Route path="/login" exact component={Login}></Route>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      authenticated: state.loginAuth.authenticated,
      //currentUser: state.loginAuth.currentUser,
      loading: state.loginAuth.loading,
      missions: state.MissionReducer.missions,
      activeMyMissionId: state.MissionReducer.activeMyMissionId,
      activemyMission: state.MissionReducer.activemyMission,
      homeMissions: state.MissionReducer.homeMissions,
      hotMissions: state.MissionReducer.hotMissions,
    }),
    {
      handleLogin,
      handleLogout,
      LoadToGetCurrentUser,
      getMissionList,
      getHomeMissionList,
      getHotMissionList,
      postAttednigMission,
      onClickMyMissionList,
    },
  )(App),
);
