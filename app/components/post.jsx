var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var fav = false;

    var tags = this.props.data.tags;

    // if any of the post's tags is favorite
    // then we know the post is a fav post
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
        || nameOfClass === "fav-icon active"
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

    var _this = this;

    var postID = jQuery(event.target).data('postid');
    var isPostFav = this.state.isPostFav;
    var tagsArr = this.props.data.tags;

    var newTags = [];

    // loop through tags of this post to just get the ID's of tags
    for (var key in tagsArr) {
      // skip loop if the property is from prototype
      if (!tagsArr.hasOwnProperty(key)) continue;

      var tag = tagsArr[key];

      // trying to remove the fav tag so if the ID doesn't match
      // then add it to the new array
      if (tag.ID != this.props.favTag.ID) {
        newTags.push(tag.ID);
      }
    }

    tagsArr = newTags; // assign it back to the old array

    if(!isPostFav) {
      // if it's not a fav post, then add fav tag to it
      tagsArr.push(this.props.favTag.ID);
    }

    // make the request to update the post with new tags
    jQuery.ajax({
      method: "POST",
      url: homeUrl + "/wp-json/wp/v2/posts/" + postID,
      data: {
        "tags": tagsArr
      },
      beforeSend: function ( xhr ) {
        xhr.setRequestHeader( 'X-WP-Nonce', AUTH.nonce );
      },
      success : function( response ) {
        console.log("successfully updated");
        _this.setState({ isPostFav: !isPostFav })
      },
      fail : function( response ) {
        console.log( "fail => " + response );
      }
    });
  },
  sendPost: function(event) {
    console.log("sent");
  },
  deletePost: function(event) {
    var postID = jQuery(event.target).data('postid');
    var _this = this;

    var result = confirm("Are you sure you want to delete this post?");
    if (result) {
      jQuery.ajax({
        method: "DELETE",
        url: homeUrl + "/wp-json/wp/v2/posts/" + postID,
        beforeSend: function ( xhr ) {
          xhr.setRequestHeader( 'X-WP-Nonce', AUTH.nonce );
        },
        success : function( response ) {
          console.log("successfully deleted");
          _this.props.filter(-1, "All Posts");
        },
        fail : function( response ) {
          console.log( "fail => " + response );
        }
      });
    }
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
          <div data-postid={this.props.data.id} className="send-icon" onClick={this.sendPost}></div>
          <div data-postid={this.props.data.id} className="delete-icon" onClick={this.deletePost}></div>
        </div>
      </div>
    );
  }
});
