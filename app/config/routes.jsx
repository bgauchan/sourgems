
var React = require('react');
var Home = require('../components/home.jsx');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="home" path="/" handler={Home}>
  </Route>
);
