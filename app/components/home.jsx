
var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Nav = require('./nav.jsx');
var Posts = require('./posts.jsx');

var Home = React.createClass({
  getInitialState: function() {
    return {
      jsonUrl: jsonUrl + "/posts?per_page=30",
      pageTitle: "All Posts",
      currentCollectionID: -1,
      data: []
    };
  },
  handleCollectionChange: function(collectionID, newPageTitle) {
    this.setState({
      pageTitle: newPageTitle,
      currentCollectionID: collectionID
    });
  },
  handleUrlChange: function(url, newPageTitle) {
    this.loadPostsFromServer(url);
    this.setState({
      pageTitle: newPageTitle
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
    this.loadPostsFromServer(this.state.jsonUrl);
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar
            data={this.state.data}
            onUrlChange={this.handleCollectionChange} />
        <section className="content">
          <Nav
            pageTitle={this.state.pageTitle}
            jsonUrl={this.state.jsonUrl}
            onUrlChange={this.handleUrlChange} />
          <Posts
            data={this.state.data}
            currentCollectionID={this.state.currentCollectionID}
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
