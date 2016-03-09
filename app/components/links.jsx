
var React = require('react');

module.exports = React.createClass({
  handleClick: function(event) {
    event.preventDefault();


  },
  render: function() {
    return (
      <ul className="links">
        <li>
          <a href={ homeUrl } className="active">All Posts</a>
        </li>
        <li>
          <a href="" onClick={this.handleClick}>Bookmarks</a>
        </li>
        <li>
          <a href="/">Images</a>
        </li>
        <li>
          <a href="/">Notes</a>
        </li>
        <li>
          <a href="/">Articles</a>
        </li>
      </ul>
    );
  }
});