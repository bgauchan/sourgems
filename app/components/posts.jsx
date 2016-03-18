var React = require('react');

module.exports = React.createClass({
  render: function() {
    var favPosts = this.props.favPosts;

    var posts = this.props.data.map(function (post) {
      return (
        <Post data={post} key={post.id} favPosts={favPosts}/>
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
    var postID = jQuery(event.target).data('postid');
    console.log("favorited by " + postID);

    jQuery.ajax({
      url: homeUrl + "/wp-json/wp/v2/posts/" + postID,
      dataType: 'json',
      type: 'POST',
      cache: false,
      success: function(data) {
        // this.setState({data: data});
        console.log("something worked");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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

    var favClassName = "fav-icon"; // to highlight whether a post is favorited or not
    var favImgUrl = themeUrl + "/images/fav.svg";

    // use the post excerpt if the content is too long
    if (content.length > 500) {
      content = this.props.data.excerpt.rendered.substring(0, 200) + "...";
    }

    if(this.props.favPosts.indexOf(this.props.data.id) > -1) {
      favClassName = "fav-icon active";
      favImgUrl = themeUrl + "/images/fav-active.svg";
    }

    return (
      <div data-post-id={this.props.data.id} className="post"
          onClick={this.handleClick}>
        <h5 dangerouslySetInnerHTML={{__html: title}} />
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
        <div className="overlay-icons" onClick={this.handleClick}>
          <div data-postid={this.props.data.id} className={favClassName} onClick={this.favPost}>
            <img data-postid={this.props.data.id} className="fav-icon" onClick={this.favPost} 
              src={ favImgUrl } 
              alt="fav posts icon" />
          </div>
          <div className="send-icon" onClick={this.sendPost}>
            <img className="send-icon" onClick={this.sendPost} src={ themeUrl + "/images/send.svg" } 
              alt="send posts icon" />
          </div>
          <div className="delete-icon" onClick={this.deletePost}>
            <img className="delete-icon" onClick={this.deletePost} src={ themeUrl + "/images/delete.svg" } 
              alt="delete posts icon" />
          </div>
        </div>
      </div>
    );
  }
});