
var React = require('react');
var Links = require('./links.jsx');
var Collections = require('./collections.jsx');

module.exports = React.createClass({
  handleClick: function(event) {    

    this.setState({   
      activeCollectionID: event.target.id
    });

    var url = "";;

    if(event.target.id > 0) {
      url = jsonUrl + "/posts?filter[cat]=" + event.target.id;
      this.props.onUrlChange(url, event.target.getAttribute('name'));
    } else {
      url = jsonUrl + "/posts?per_page=30";
      this.props.onUrlChange(url, "All Posts");
    }
  },
  loadCollectionsFromServer: function() {
    jQuery.ajax({
      url: homeUrl + "/wp-json/wp/v2/categories",
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
      activeCollectionID: "", // keeps track of the currently selected collection
      data: []
    };
  },
  componentDidMount: function() {
    this.loadCollectionsFromServer();
  },
  render: function() {
    
    var activeClassName;

    if(this.state.activeCollectionID.length < 1) {
      activeClassName = "active";
    }

    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ themeUrl + "/images/logo.png" } alt="logo" />
        </div>
        <ul className="links">
          <li> 
            <h5 className={activeClassName} onClick={this.handleClick}>All Posts</h5> 
          </li>
        </ul>
        <ul className="collections">
          <li>
            <h5 onClick={this.handleClick}>COLLECTIONS</h5>
          </li>
          {  
            this.state.data.map(function (collection) {
              activeClassName = "";

              if(this.state.activeCollectionID == collection.id) {
                activeClassName = "active";
              }

              return (
                <li key={collection.id}>
                  <span className={activeClassName} id={collection.id} 
                        name={collection.name} onClick={this.handleClick}>
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