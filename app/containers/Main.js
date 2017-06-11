var React = require('react');
var Link = require('react-router').Link;

function Login (props) {            
    const Login = <a href={`/auth/github?target=${props.path.substring(1)}`}>Login</a>;        
    const Logout = <a href="/logout">Logout</a>;
    return props.signedOn ? Logout : Login; 
}

function Profile(props) {
    const url = props.signedOn ? "#/profile" : "/auth/github?target=profile";
    return <a href={url}>Profile</a>;
}

var Main = React.createClass({
    getInitialState: function() {
        return {
            signedOn: false,            
        }
    },
    componentDidMount: function() {        
        auth.isSignedOn()
        .then(result => {
            if(result.data) {
                this.setState({
                    signedOn: result.data
                });
            }
        });        
    },    
    render: function () {             
        return (
        <div>
            <header>
                <div>   
                    <span>reBooks</span>                          
                    <nav>                        
                        <Login path={this.props.location.pathname} signedOn={this.state.signedOn}/>
                        <Profile signedOn={this.state.signedOn}/>                                                
                    </nav>
                </div>
            </header>            
            <main>
                <div>
                    {React.cloneElement(this.props.children, {
                        signedOn: this.state.signedOn
                    })}
                </div>
            </main>            
        </div>
        )
    }
});

module.exports = Main;