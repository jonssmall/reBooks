'use strict';

import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Books from '../containers/BooksContainer.js';
import Book from '../containers/BookContainer.js';
import Profile from '../containers/ProfileContainer.js';

//React-Router 4.0

const AuthRouter = () => (  
  <Router>    
    <div id="layout">
      <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
      </a>
      <div id="menu">
        <div className="pure-menu">
          <a className="pure-menu-heading" href="#">reBook</a>
          <ul className="pure-menu-list">            
            <li className="pure-menu-item">
              <Link to="/books" className="pure-menu-link">Books</Link>
            </li>
            <li className="pure-menu-item">
              <Link to="/profile" className="pure-menu-link">Profile</Link>
            </li>            
            <li className="pure-menu-item">
              {AuthButton}
            </li>
          </ul>
        </div>
      </div>

      <div id="main">
        <div className="header">
          <h1>reBook</h1>
          <h2>Request and respond to offers for book trades.</h2>
        </div>
        <div className="content">
          <Route path="/books" component={Books}/>
          <Route path="/books/:id" component={Book}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/profile" component={Profile}/>
        </div>
      </div>
    </div>
  </Router>
);

const auth = {
  isAuthenticated: window.USER ? true : false,
};

const AuthButton = auth.isAuthenticated ? <a href="/logout" className="pure-menu-link">Logout</a> : 
                                          <a href="/auth/github" className="pure-menu-link">Login (Github)</a>;

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

export default AuthRouter;