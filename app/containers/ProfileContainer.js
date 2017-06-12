var React = require('react');
var Profile = require('../components/Profile');
import updateUser from '../helpers/userHelpers';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: window.USER};

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(event) {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({
      user,
    })
  }

  handleSubmit() {    
    updateUser(this.state.user);
  }

  render() {       
    return (
      <div>
        <Profile user={this.state.user} onUpdate={this.handleUpdate} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default ProfileContainer;