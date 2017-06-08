var React = require('react');
var ReactDOM = require('react-dom');
//var routes = require('./config/routes2');
import Routes from './config/routes2';

//ReactDOM.render(routes, document.getElementById('app'));
//console.log(routes);

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);