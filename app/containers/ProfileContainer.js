var React = require('react');
var Profile = require('../components/Profile');

var ProfileContainer = React.createClass({
    // getInitialState: function() {
    //     return {
    //         user: undefined,            
    //     }
    // },    
    // componentDidMount: function() {   
    //     auth.getUser()
    //         .then(result => {                           
    //             if(result.data) {
    //                 let user = result.data.github
    //                 this.setState({
    //                     user: user,                        
    //                 });                    
    //             }
    //         });
    // },
    // handleDelete: function(id, e) {
    
    // },
    render: function () {        
        return (
            <div>
                <Profile delete={this.handleDelete} />
            </div>
        )
    }
});

export default ProfileContainer;