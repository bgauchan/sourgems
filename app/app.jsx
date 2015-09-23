
var React = require('react');
var RouterModule = require('react-router');
var Router = RouterModule.Router;  // component
var Route = RouterModule.Route;
var routes = require( './config/routes.jsx' );

var Home = require('./components/home.jsx');

React.render((
  <Router>
    <Route name="home" path="/" component={Home}>
    </Route>
  </Router>
), document.getElementById('main'))
