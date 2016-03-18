
var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Nav = require('./nav.jsx');
var Posts = require('./posts.jsx');

var Home = React.createClass({
  handleUrlChange: function(newUrl, newPageTitle) {
    this.loadPostsFromServer(newUrl);
    this.setState({   
      pageTitle: newPageTitle
    });
  },
  loadFavPostsFromServer: function() {
    jQuery.ajax({
      url: jsonUrl + "/posts?filter[tag]=favorite",
      dataType: 'json',
      cache: false,
      success: function(data) {

        var favPosts = [];

        for(var i = 0; i < data.length; i++) {
          favPosts.push(data[i].id);
        }

        this.setState({favPosts: favPosts});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadPostsFromServer: function(url) {
    jQuery.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});

        // load fav posts after everything is loaded
        this.loadFavPostsFromServer(); 
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      jsonUrl: jsonUrl + "/posts?per_page=30",
      pageTitle: "All Posts",
      favPosts: [],
      data: []
    };
  },
  componentDidMount: function() {    
    this.loadPostsFromServer(this.state.jsonUrl);
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar onUrlChange={this.handleUrlChange} />
        <section className="content">
          <Nav pageTitle={this.state.pageTitle} />
          <Posts 
            data={this.state.data} 
            favPosts={this.state.favPosts}
            jsonUrl={this.state.jsonUrl} />
        </section>
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function () {
    return (
        <Home />
    );
  }
});
