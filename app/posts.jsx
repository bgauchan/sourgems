var React = require('react');
var Post = require('./post.jsx');

module.exports = React.createClass({
  render: function() {
    var counter = 0;
    var postNodes = this.props.data.map(function (post) {
      return (
        <Post data={post} />
      );
    });

    return (
      <section className="container all-posts">
        { postNodes }
      </section>
    );
  }
});
