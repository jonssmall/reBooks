'use strict';

import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Home from '../containers/HomeContainer.js';
import Profile from '../containers/ProfileContainer.js';

//React-Router 4.0

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/profile">Profile Page</Link></li>
      </ul>
      <Route path="/public" component={Home}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/profile" component={Profile}/>
    </div>
  </Router>
);

const auth = {
  isAuthenticated: window.USER ? true : false,
};

const AuthButton = withRouter(({ history }) => (
  auth.isAuthenticated ? (
    <p>
      Welcome! 
      <a href="/logout"><button>Sign out</button></a>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

class Login extends React.Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
   
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <a href="/auth/github"><button>Log in (Github)</button></a>
      </div>
    )
  }
};

export default AuthExample;