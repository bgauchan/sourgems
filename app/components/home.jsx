
var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Nav = require('./nav.jsx');
var Posts = require('./posts.jsx');

var url = homeUrl + "/wp-json/wp/v2/posts";

module.exports = React.createClass({
  loadPostsFromServer: function() {
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
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar />
        <section className="content">
          <Nav />
          <Posts data={this.state.data} />
        </section>
      </div>
    );
  }
});
