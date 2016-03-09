
var React = require('react');
var Links = require('./links.jsx');
var Collections = require('./collections.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ themeUrl + "/images/logo.png" } alt="logo" />
        </div>
        <Links 
          jsonUrl={ this.props.jsonUrl }
          onUrlChange={this.props.onUrlChange}
        />
        <Collections />
      </section>
    );
  }
});