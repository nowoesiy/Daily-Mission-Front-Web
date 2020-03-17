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
  getMissionDetail,
  onClickMissionList,
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
import HotMission from '../HotMission';
import Post from '../Post';
import PostDetail from '../PostDetail';
import Landing from '../Landing';
import SubmitContainer from '../../containers/SubmitContainer';
import MissionDetail from '../MissionDetail';
import My from '../My';
import MyEdit from '../MyEdit';

// const currentUser = {
//   id: 2,
//   name: 'seowon lee',
//   email: 'tjdnjs3664@gmail.com',
//   thumbnailUrl:
//     'https://lh4.googleusercontent.com/--aw6MInQfos/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYyNl8G2GI-QZ5ISqoAujKNmRVuA/photo.jpg',
//   missions: [
//     { id: 1, title: '1일 1알고리즘', banned: false, submit: true },
//     { id: 4, title: '비타민 챙겨먹기', banned: false, submit: true },
//     { id: 3, title: '매일 매일 운동하기', banned: false, submit: false },
//   ],
// };

class App extends React.Component {
  componentDidMount() {
    this.props.LoadToGetCurrentUser();
    this.props.getMissionList();
    this.props.getHotMissionList();
    this.props.getHomeMissionList();
    this.props.getMissionDetail(this.props.activeMissionId);
  }

  render() {
    const {
      authenticated,
      currentUser,
      activeMissionId,
      handleLogout,
      missions,
      homeMissions,
      hotMissions,
      onClickMissionList,
      onClickMyMissionList,
      activeMission,
      getMissionDetail,
      activeMyMissionId,
    } = this.props;
    const postId = '1';

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
                <Route path={'/mission/detail/' + activeMissionId} exact>
                  {activeMission && (
                    <MissionDetail
                      mission={activeMission}
                      postAttednigMission={postAttednigMission}
                    />
                  )}
                </Route>
                <Route path="/" exact>
                  <Landing
                    hotMissions={hotMissions}
                    missions={homeMissions}
                    onClickMissionList={onClickMissionList}
                    getMissionDetail={getMissionDetail}
                  />
                </Route>
                <Route path="/mission" exact>
                  <Mission
                    missions={missions}
                    onClickMissionList={onClickMissionList}
                    getMissionDetail={getMissionDetail}
                  />
                </Route>
                <Route path="/hot-mission" component={HotMission}></Route>
                <Route path="/post" exact component={Post}></Route>
                <Route
                  path={`/post/detail/${postId}`}
                  component={PostDetail}
                ></Route>
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
                <Route path={`/my/${activeMyMissionId}`} exact>
                  {currentUser ? (
                    <SubmitContainer
                      currentUser={currentUser}
                      activeMyMissionId={activeMyMissionId}
                    />
                  ) : (
                    <Redirect to={'/'} />
                  )}
                </Route>
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
      currentUser: state.loginAuth.currentUser,
      loading: state.loginAuth.loading,
      activeMissionId: state.MissionReducer.activeMissionId,
      missions: state.MissionReducer.missions,
      activeMission: state.MissionReducer.activeMission,
      activeMyMissionId: state.MissionReducer.activeMyMissionId,
      activemyMission: state.MissionReducer.activemyMission,
      homeMissions: state.MissionReducer.homeMissions,
      hotMissions: state.MissionReducer.hotMissions,
    }),
    {
      handleLogin,
      handleLogout,
      LoadToGetCurrentUser,
      onClickMissionList,
      getMissionList,
      getHomeMissionList,
      getHotMissionList,
      getMissionDetail,
      postAttednigMission,
      onClickMyMissionList,
    },
  )(App),
);
