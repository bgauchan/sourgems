
var React = require('react');
var Links = require('./links.jsx');
var Collections = require('./collections.jsx');

module.exports = React.createClass({
  handleClick: function(event) {    
    var url = jsonUrl + "/posts?per_page=30";
    this.props.onUrlChange(url);
  },
  render: function() {
    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ themeUrl + "/images/logo.png" } alt="logo" />
        </div>
        <ul className="links">
          <li> <h5 onClick={this.handleClick}>All Posts</h5> </li>
        </ul>
        <Collections onUrlChange={this.props.onUrlChange} />
      </section>
    );
  }
});