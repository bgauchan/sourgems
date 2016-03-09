
var React = require('react');

module.exports = React.createClass({
  handleClick: function(event) {
    event.preventDefault();

    var url = jsonUrl + "/posts?filter[tag]=" + event.target.id ;

    if(event.target.id === "all-posts") {
      url = jsonUrl + "/posts?per_page=30"; // homepage
    }

    this.props.onUrlChange(url);
  },
  render: function() {
    return (
      <ul className="links">
        <li>
          <a href="" id="all-posts" onClick={this.handleClick}>
            All Posts
          </a>
        </li>
        <li>
          <a href="" id="bookmark" onClick={this.handleClick}>
            Bookmarks
          </a>
        </li>
        <li>
          <a href="" id="image" onClick={this.handleClick}>
            Images
          </a>
        </li>
        <li>
          <a href="" id="note" onClick={this.handleClick}>
            Notes
          </a>
        </li>
        <li>
          <a href="" id="article" onClick={this.handleClick}>
            Articles
          </a>
        </li>
      </ul>
    );
  }
});