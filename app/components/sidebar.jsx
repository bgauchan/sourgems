var React = require('react');
var Collections = require('./collections.jsx');

module.exports = React.createClass({
  loadCollectionsFromServer: function() {
    jQuery.ajax({
      url: homeUrl + "/wp-json/wp/v2/terms/category/",
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
    this.loadCollectionsFromServer();
  },
  render: function() {
    var logoUrl = themeUrl + "/images/logo.png";

    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ logoUrl } alt="logo" />
        </div>
        <ul className="links">
          <li>
            <a href="/" className="active">Home</a>
          </li>
          <li>
            <a href="/">Bookmarks</a>
          </li>
          <li>
            <a href="/">Images</a>
          </li>
          <li>
            <a href="/">Articles</a>
          </li>
        </ul>
        <Collections data={this.state.data} />
      </section>
    );
  }
});
