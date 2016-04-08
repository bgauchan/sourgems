var React = require('react');
var Post = require('./post.jsx');

module.exports = React.createClass({
  getFavTag: function() {

    var favTag;

    for(var key in this.props.data) {
      // skip loop if the property is from prototype
      if (!this.props.data.hasOwnProperty(key)) continue;

      if(favTag) {
        break; // once a fav tag has been found, don't need to loop anymore
      }

      var post = this.props.data[key];
      var tags = post.tags;

      // if any of the post's tags is favorite
      // then we know the fav tag name/ID
      for(var i = 0; i < tags.length; i++) {
        if(tags[i]["name"] === "favorite") {
          favTag = tags[i];
        }      
      }
    }

    return favTag;
  },
  filterPosts: function() {
    var collectionID = this.props.currentCollectionID;
    var filteredPosts = [];

    // -1 is default so if it's that then filtered posts is basically all posts
    // but if it has a valid collection ID, then only show posts that match
    // that collection ID
    if(collectionID > -1) {
      for(var key in this.props.data) {
        // skip loop if the property is from prototype
        if (!this.props.data.hasOwnProperty(key)) continue;

        var post = this.props.data[key];

        // loop through categories
        for(var key2 in post.categories) {
          // skip loop if the property is from prototype
          if (!post.categories.hasOwnProperty(key2)) continue;

          var category = post.categories[key2];

          if(category.ID == collectionID) {
            filteredPosts.push(post);            
          }

        }    
      }
    } else {
      filteredPosts = this.props.data;
    }

    return filteredPosts;
  },
  render: function() {
    var favTag = this.getFavTag();

    var posts = this.filterPosts().map(function (post) {
      return (
        <Post data={post} 
              key={post.id} 
              favTag={favTag}/>
      );
    });

    return (
      <div className="container all-posts" ref="all-posts">
        { posts }
      </div>
    );
  }
});
