
var React = require('react');
var Nav = require('./nav.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>HELLO VENUS</h1>
        <Nav />
      </div>
    );
  }
});

React.render( <App />, document.getElementById('main') );
