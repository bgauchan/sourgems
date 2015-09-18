var React = require('react');

module.exports = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function (post) {
      return (
        <h2>
          { post.title }
        </h2>
      );
    });
    return (
      <div class="all-posts">
        { postNodes }
      </div>
    );
  }
});
