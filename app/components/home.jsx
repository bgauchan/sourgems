
var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Nav = require('./nav.jsx');
var Posts = require('./posts.jsx');

var Home = React.createClass({
  handleUrlChange: function(newUrl) {
    this.setState({      
      jsonUrl: newUrl
    });
  },
  loadPostsFromServer: function() {
    jQuery.ajax({
      url: this.state.jsonUrl,
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
      jsonUrl: jsonUrl + "/posts?per_page=30",
      data: []
    };
  },
  render: function() {
    this.loadPostsFromServer();
    return (
      <div className="app">
        <Sidebar onUrlChange={this.handleUrlChange} />
        <section className="content">
          <Nav />
          <Posts data={this.state.data} jsonUrl={this.state.jsonUrl}/>
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
