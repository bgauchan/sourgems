var React = require('react');

module.exports = React.createClass({
  render: function() {
    var posts = this.props.data.map(function (post) {
      return (
        <Post data={post} key={post.id} />
      );
    });

    return (
      <div className="container all-posts" ref="all-posts">
        { posts }
      </div>
    );
  }
});

var Post = React.createClass({
  handleClick: function(event) {

    var nameOfClass = event.target.getAttribute('class');

    if(nameOfClass === "overlay-icons" 
        || nameOfClass === "fav-icon"
        || nameOfClass === "send-icon"
        || nameOfClass === "delete-icon") {
      event.preventDefault();
    } else {
      jQuery('body').css('position', 'fixed');
      jQuery('.modal').show();
      jQuery('.modal h4').html(this.props.data.title.rendered);
      jQuery('.modal .content').html(this.props.data.content.rendered);
    }
  },
  favPost: function(event) {
    console.log("favorited");
  },
  sendPost: function(event) {
    console.log("sent");
  },
  deletePost: function(event) {
    console.log("deleted");
  },
  render: function() {
    var content = this.props.data.content.rendered;
    var title = this.props.data.title.rendered;

    // use the post excerpt if the content is too long
    if (content.length > 500) {
      content = this.props.data.excerpt.rendered.substring(0, 200) + "...";
    }

    return (
      <div data-post-id={this.props.data.id} className="post"
          onClick={this.handleClick}>
        <h5 dangerouslySetInnerHTML={{__html: title}} />
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
        <div className="overlay-icons" onClick={this.handleClick}>
          <div className="fav-icon" onClick={this.favPost}>
            <img className="fav-icon" onClick={this.favPost} src={ themeUrl + "/images/fav.svg" } alt="fav posts icon" />
          </div>
          <div className="send-icon" onClick={this.sendPost}>
            <img className="send-icon" onClick={this.sendPost} src={ themeUrl + "/images/send.svg" } alt="send posts icon" />
          </div>
          <div className="delete-icon" onClick={this.deletePost}>
            <img className="delete-icon" onClick={this.deletePost} src={ themeUrl + "/images/delete.svg" } alt="delete posts icon" />
          </div>
        </div>
      </div>
    );
  }
});