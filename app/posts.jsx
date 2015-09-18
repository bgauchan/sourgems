var React = require('react');

module.exports = React.createClass({
  render: function() {
    var postStyle = {
      width: '200'
    };

    var postNodes = this.props.data.map(function (post) {
      return (
        <div className="post" style={postStyle}>
          { post.title }
          <div className="content" dangerouslySetInnerHTML={{__html: post.content.rendered}} />
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
