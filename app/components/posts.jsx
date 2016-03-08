var React = require('react');
var Post = require('./post.jsx');

module.exports = React.createClass({
  render: function() {
    var counter = 0;
    var posts = this.props.data.map(function (post) {
      return (
        <Post data={post} />
      );
    });

    return (
      <div className="container all-posts" ref="all-posts">
        { posts }
      </div>
    );
  }
});
