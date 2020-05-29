import React from 'react';
import './index.scss';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadToGetCurrentUser } from '../../modules/reduer_loginAuth';
import { ToastContainer } from 'react-toastify';
import {
  getMissionList,
  getHomeMissionList,
  getHotMissionList,
  postAttednigMission,
  onClickMyMissionList,
  closetAttendModal,
} from '../../modules/reducer_mission';
import OAuth2RedirectHandler from '../../oauth2/OAuth2RedirectHandler';
import HeaderContainer from '../../containers/HeaderContainer';
import AsideContainer from '../../containers/AsideContainer';
import Login from '../Login';
import Post from '../../containers/PostContainer';
import SubmitContainer from '../../containers/SubmitContainer';
import MissionDetail from '../MissionDetail';
import MissionDetailB from '../MissionDetailB';
import My from '../My';
import MyEdit from '../MyEdit';
import MissionListContainer from '../../containers/MissionListContainer';
import LandingContainer from '../../containers/LandingContainer';

class App extends React.Component {
  componentDidMount() {
    this.props.LoadToGetCurrentUser();
    this.props.getMissionList();
    this.props.getHotMissionList();
    this.props.getHomeMissionList();
  }

  render() {
    const {
      currentUser,
      onClickMyMissionList,
      activeMyMissionId,
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
        <HeaderContainer />
        {this.props.location.pathname !== '/login' ? (
          <>
            <AsideContainer />
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
                <Route path="/" exact component={LandingContainer} />
                <Route path="/mission" exact component={MissionListContainer} />
                <Route path="/post" exact component={Post} />
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
      activeMyMissionId: state.MissionReducer.activeMyMissionId,
      activemyMission: state.MissionReducer.activemyMission,
      isPasswordRight: state.MissionReducer.isPasswordRight,
    }),
    {
      LoadToGetCurrentUser,
      getMissionList,
      getHomeMissionList,
      getHotMissionList,
      postAttednigMission,
      onClickMyMissionList,
      closetAttendModal,
    },
  )(App),
);
