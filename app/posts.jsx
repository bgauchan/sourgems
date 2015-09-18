var React = require('react');

module.exports = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function (post) {
      return (
        <div className="post">
          { post.title }
          <div className="" dangerouslySetInnerHTML={{__html: post.content.rendered}} />
        </div>
      );
    });

    return (
      <div class="all-posts">
        { postNodes }
      </div>
    );
  }
});
