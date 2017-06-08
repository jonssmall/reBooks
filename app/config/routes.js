var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var auth = require('../helpers/authHelpers');
var Main = require('../containers/Main');
var HomeContainer = require('../containers/HomeContainer');
var ProfileContainer = require('../containers/ProfileContainer');


function requireAuth (nextState, replace, callback) {    
    if(!window.USER) {
        console.log('not logged in');        
        var data = {message: 'Unauthorized - Please Login'};        
        console.log(nextState);
        replace({
            pathname: '/',
            //HOW TO GO BACK TO PREVIOUS VIEW ???
            state: { nextPathname: nextState.location.pathname }
        });                
    }
    callback();        
}

function reroute(nextState, replace, callback) {
    replace({
        pathname: '/polls/',        
        state: { nextPathname: nextState.location.pathname }
    });
    callback(); 
}

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>        
      <IndexRoute component={HomeContainer} onEnter={reroute} />
      <Route path='profile' component={ProfileContainer} onEnter={requireAuth}/>
      {/*<Route path='polls' component={PollsContainer}>
        <Route path='new' component={NewPollContainer} onEnter={requireAuth} />
        <Route path=':id' component={PollContainer} />        
      </Route>*/}
    </Route>
  </Router>
);

module.exports = routes;