var React = require('react');
var Link = require('react-router').Link;

function Profile (props) {    
    var output = null;
    if(props.user) {        
        output = (
            <div>                
                <div>
                    <h1>Welcome {props.user.displayName}</h1>                
                </div>                                  
            </div>
        ); 
    }
     return output;
}

module.exports = Profile;