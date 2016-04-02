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
  getInitialState: function() {
    var fav = false;

    var tags = this.props.data.tags;

    for(var i = 0; i < tags.length; i++) {
      if(tags[i]["name"] === "favorite") {
        fav = true;
      }      
    }

    return {
      isPostFav: fav
    };
  },
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
    var tags = [-1];

    if(!this.state.isPostFav) {
      console.log("not fav");
      tags = [14];
    }

    jQuery.ajax({
      method: "POST",
      url: homeUrl + "/wp-json/wp/v2/posts/" + postID,
      data: {
        "tags": "tags"
      },
      beforeSend: function ( xhr ) {
        xhr.setRequestHeader( 'X-WP-Nonce', AUTH.nonce );
      },
      success : function( response ) {
        console.log( response );
      },
      fail : function( response ) {
        console.log( response );
      }
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
    if(content.length > 500) {
      content = this.props.data.excerpt.rendered.substring(0, 200) + "...";
    } 

    // checks to see if there's only one link (and then if its a pdf link)
    if((content.match(/<a href=/g) || []).length == 1) {
      if(content.indexOf(".pdf") > -1) {
        content = "<div class='pdf icon-holder'>" + 
                    "<img class='pdf-icon' src='" + themeUrl + "/images/pdf-2.svg' alt='pdf icon' />" +                     
                  "</div>" + content;
      }
    }

    if(this.state.isPostFav) {
      favClassName = "fav-icon active";
      favImgUrl = themeUrl + "/images/fav-active.svg";
    }

    return (
      <div data-post-id={this.props.data.id} className="post"
          onClick={this.handleClick}>
        <h5 dangerouslySetInnerHTML={{__html: title}} />
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
        <div className="overlay-icons" onClick={this.handleClick}>
          <div data-postid={this.props.data.id} className={favClassName} onClick={this.favPost}></div>
          <div className="send-icon" onClick={this.sendPost}></div>
          <div className="delete-icon" onClick={this.deletePost}></div>
        </div>
      </div>
    );
  }
});