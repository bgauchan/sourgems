
var React = require('react');
var RouterModule = require('react-router');

var Router = RouterModule.Router;  // component
var Route = RouterModule.Route;

var Home = require('./components/home.jsx');

React.render((
  <Router>
    <Route name="home" path="/" component={Home}>
    </Route>
  </Router>
), document.getElementById('main'))
