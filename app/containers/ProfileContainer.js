'use strict';

import React from 'react';
import Profile from '../components/Profile';
import MyBooksContainer from './MyBooksContainer';
import RequestContainer from './RequestContainer';
import updateUser from '../helpers/userHelpers';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: window.USER};

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleUpdate(event) {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({
      user,
    });
  };

  handleSubmit() {    
    updateUser(this.state.user)
      .then(result => {
        console.log(result);
      });
  };

  render() {     
    return (
      <div>
        <Profile user={this.state.user} onUpdate={this.handleUpdate} onSubmit={this.handleSubmit} />        
        <MyBooksContainer />
        <RequestContainer history={this.state.user.requestHistory} />
      </div>
    )
  };
};

export default ProfileContainer;