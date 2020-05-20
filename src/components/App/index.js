import React from 'react';
import './index.scss';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  handleLogout,
  LoadToGetCurrentUser,
} from '../../modules/reduer_loginAuth';
import { toast, ToastContainer } from 'react-toastify';
import {
  getMissionList,
  getHomeMissionList,
  getHotMissionList,
  postAttednigMission,
  onClickMyMissionList,
  postMission,
  closetAttendCodeMessage,
  closetAttendModal,
} from '../../modules/reducer_mission';
import OAuth2RedirectHandler from '../../oauth2/OAuth2RedirectHandler';
import Header from '../Header';
import Aside from '../Aside';
import Login from '../Login';
import Mission from '../Mission';
import Post from '../Post';
import Landing from '../Landing';
import SubmitContainer from '../../containers/SubmitContainer';
import MissionDetail from '../MissionDetail';
import MissionDetailB from '../MissionDetailB';
import My from '../My';
import MyEdit from '../MyEdit';
import EditorComponent from '../EditorComponent';

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
      currentUser,
      handleLogout,
      missions,
      homeMissions,
      hotMissions,
      onClickMyMissionList,
      activeMyMissionId,
      attendCode,
      isPasswordRight,
      closetAttendModal,
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
          attendCode={attendCode}
          postMission={this.props.postMission}
          authenticated={authenticated}
          currentUser={currentUser}
          handleLogout={handleLogout}
          closetAttendCodeMessage={this.props.closetAttendCodeMessage}
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
                  render={() =>
                    currentUser ? (
                      <MissionDetail
                        postAttednigMission={this.props.postAttednigMission}
                        currentUser={currentUser}
                        isPasswordRight={isPasswordRight}
                        closetAttendModal={closetAttendModal}
                      />
                    ) : (
                      <MissionDetailB />
                    )
                  }
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
                <Route
                  path="/my"
                  render={() =>
                    currentUser && (
                      <My
                        onClickMyMissionList={onClickMyMissionList}
                        currentUser={currentUser}
                      />
                    )
                  }
                  exact
                ></Route>
                <Route path="/my/edit" exact>
                  {currentUser ? (
                    <MyEdit
                      currentUser={currentUser}
                      LoadToGetCurrentUser={this.props.LoadToGetCurrentUser}
                    />
                  ) : (
                    <Redirect to={'/'} />
                  )}
                </Route>
                <Route
                  path="/my/:id"
                  render={() =>
                    currentUser && <SubmitContainer currentUser={currentUser} />
                  }
                  exact
                />
                <Route path="/editor" render={() => <EditorComponent />} />
              </Switch>
            </div>
            <ToastContainer />
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
    (state) => ({
      authenticated: state.loginAuth.authenticated,
      currentUser: state.loginAuth.currentUser,
      loading: state.loginAuth.loading,
      missions: state.MissionReducer.missions,
      activeMyMissionId: state.MissionReducer.activeMyMissionId,
      activemyMission: state.MissionReducer.activemyMission,
      homeMissions: state.MissionReducer.homeMissions,
      hotMissions: state.MissionReducer.hotMissions,
      attendCode: state.MissionReducer.attendCode,
      isPasswordRight: state.MissionReducer.isPasswordRight,
    }),
    {
      handleLogout,
      LoadToGetCurrentUser,
      getMissionList,
      getHomeMissionList,
      getHotMissionList,
      postAttednigMission,
      onClickMyMissionList,
      postMission,
      closetAttendCodeMessage,
      closetAttendModal,
    },
  )(App),
);
