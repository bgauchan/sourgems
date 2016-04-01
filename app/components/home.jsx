
var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Nav = require('./nav.jsx');
var Posts = require('./posts.jsx');

var Home = React.createClass({
  getInitialState: function() {
    return {
      jsonUrl: jsonUrl + "/posts?per_page=30",
      pageTitle: "All Posts",
      favPosts: [],
      data: []
    };
  },
  childContextTypes: {
    favPosts: React.PropTypes.array
  },
  getChildContext: function() {
    return {favPosts: this.state.favPosts};
  },
  handleUrlChange: function(newUrl, newPageTitle) {
    this.loadFavPostsFromServer(newUrl);
    this.setState({   
      pageTitle: newPageTitle
    });
  },
  loadFavPostsFromServer: function(newUrl) {
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

        // load fav posts after everything is loaded
        this.loadPostsFromServer(newUrl); 
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {    
    this.loadFavPostsFromServer(this.state.jsonUrl);
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar onUrlChange={this.handleUrlChange} />
        <section className="content">
          <Nav 
            pageTitle={this.state.pageTitle} 
            jsonUrl={this.state.jsonUrl} 
            onUrlChange={this.handleUrlChange} />
          <Posts 
            data={this.state.data} 
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
