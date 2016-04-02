
var React = require('react');
var Links = require('./links.jsx');
var Collections = require('./collections.jsx');

module.exports = React.createClass({
  handleClick: function(event) {  

    var newLinkName = jQuery(event.target).data('link-name'); 

    this.setState({   
      linkName: newLinkName
    });

    var url = "";
    var id = jQuery(event.target).data('id');

    console.log(newLinkName);

    if(id > 0) {
      url = jsonUrl + "/posts?filter[cat]=" + id;
      this.props.onUrlChange(url, event.target.getAttribute('name'));
    } else {
      url = jsonUrl + "/posts?per_page=30";
      this.props.onUrlChange(url, "All Posts");
    }
  },
  getInitialState: function() {
    return {
      linkName: "", // keeps track of the currently selected collection
    };
  },
  componentDidMount: function() {
    // this.loadCollectionsFromServer();
  },
  render: function() {
    
    var activeLink;

    if(this.state.linkName) {
      activeLink = "active";
    }

    var collections = [];

    if(this.props.data[0]) {
      var all_categories = this.props.data[0]["all_categories"]; 

      for (var key in all_categories) {
        // skip loop if the property is from prototype
        if (!all_categories.hasOwnProperty(key)) continue;

        var category = all_categories[key];
        collections.push(category);
      }
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
            collections.map(function (collection) {    
              activeLink = "";

              if(this.state.linkName === collection.name) {
                activeLink = "active";
              }

              var text = collection.name + "(" + collection.count + ")";
              var count = "(" + collection.count + ")";

              return (
                <li data-link-name={collection.name} 
                    data-id={collection.cat_ID} 
                    name={collection.name} 
                    key={collection.cat_ID}>
                  <div data-link-name={collection.name} 
                        className={activeLink} 
                        data-id={collection.cat_ID} 
                        name={collection.name} 
                        onClick={this.handleClick}>
                    <span 
                        data-link-name={collection.name}
                        data-id={collection.cat_ID}
                        name={collection.name}>
                        {collection.name}</span>
                    <span
                        data-link-name={collection.name}
                        data-id={collection.cat_ID}
                        name={collection.name}
                        className="count">
                        {count}</span>
                  </div>
                </li>
              );
            }.bind(this))
          }
        </ul>
      </section>
    );
  }
});