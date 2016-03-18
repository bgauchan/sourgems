
var React = require('react');
var Links = require('./links.jsx');
var Collections = require('./collections.jsx');

module.exports = React.createClass({
  handleClick: function(event) {  

    var newLinkName = jQuery(event.target).data('link-name');  

    this.setState({   
      linkName: newLinkName
    });

    var url = "";;

    if(event.target.id > 0) {
      url = jsonUrl + "/posts?filter[cat]=" + event.target.id;
      this.props.onUrlChange(url, event.target.getAttribute('name'));
    } else {
      if(newLinkName === "fav-posts") {
        url = jsonUrl + "/posts?filter[tag]=favorite";
        this.props.onUrlChange(url, "Favorites");
      } else {
        url = jsonUrl + "/posts?per_page=30";
        this.props.onUrlChange(url, "All Posts");
      }

    }
  },
  loadCollectionsFromServer: function() {
    jQuery.ajax({
      url: homeUrl + "/wp-json/wp/v2/categories?order=desc&orderby=id",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      linkName: "", // keeps track of the currently selected collection
      data: []
    };
  },
  componentDidMount: function() {
    this.loadCollectionsFromServer();
  },
  render: function() {
    
    var activeLink;

    if(this.state.linkName) {
      activeLink = "active";
    }

    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ themeUrl + "/images/logo.png" } alt="logo" />
        </div>
        <ul className="links">
          <li data-link-name="" 
            className={this.state.linkName === "" && "active"} 
            onClick={this.handleClick}>
            <img data-link-name="" src={ themeUrl + "/images/all-posts.svg" } alt="all posts icon" />             
            <h5 data-link-name="">All Posts</h5> 
          </li>
        </ul>
        <ul className="collections">
          <li>
            <h5 onClick={this.handleClick}>COLLECTIONS</h5>
          </li>
          {  
            this.state.data.map(function (collection) {
              activeLink = "";

              if(this.state.linkName === collection.name) {
                activeLink = "active";
              }

              return (
                <li data-link-name={collection.name} key={collection.id}>
                  <span data-link-name={collection.name} 
                        className={activeLink} 
                        id={collection.id} 
                        name={collection.name} 
                        onClick={this.handleClick}>
                    {collection.name}
                  </span>
                </li>
              );
            }.bind(this))
          }
        </ul>
      </section>
    );
  }
});