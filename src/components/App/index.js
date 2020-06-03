import React from 'react';
import './index.scss';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadToGetCurrentUser } from '../../modules/reduer_loginAuth';
import OAuth2RedirectHandler from '../oauth2/OAuth2RedirectHandler';
import HeaderContainer from '../../containers/HeaderContainer';
import AsideContainer from '../../containers/AsideContainer';
import Login from '../Login';
import Post from '../../containers/PostContainer';
import SubmitContainer from '../../containers/SubmitContainer';
import MissionListContainer from '../../containers/MissionListContainer';
import LandingContainer from '../../containers/LandingContainer';
import MissionDetailContainer from '../../containers/MissionDetailContainer';
import EditContainer from '../../containers/EditContainer';
import MyContainer from '../../containers/MyContainer';

class App extends React.Component {
  componentDidMount() {
    this.props.LoadToGetCurrentUser();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Route
          path="/oauth2/redirect"
          component={OAuth2RedirectHandler}
        ></Route>
        <HeaderContainer />
        {this.props.location.pathname !== '/login' ? (
          <>
            <AsideContainer />
            <main className="container">
              <Switch>
                <Route
                  path="/mission/detail/:id"
                  component={MissionDetailContainer}
                />
                <Route path="/" exact component={LandingContainer} />
                <Route path="/mission" exact component={MissionListContainer} />
                <Route path="/post" exact component={Post} />
                <Route path="/my" exact>
                  {currentUser ? <MyContainer /> : <Redirect to={'/login'} />}
                </Route>
                <Route path="/my/edit" exact>
                  {currentUser ? <EditContainer /> : <Redirect to={'/login'} />}
                </Route>
                <Route path="/my/:id" exact>
                  {currentUser ? (
                    <SubmitContainer />
                  ) : (
                    <Redirect to={'/login'} />
                  )}
                </Route>
              </Switch>
            </main>
          </>
        ) : (
          <div className="App__login">
            <Route path="/login" exact>
              {currentUser ? <Redirect to={'/'} /> : <Login />}
            </Route>
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
    }),
    {
      LoadToGetCurrentUser,
    },
  )(App),
);
