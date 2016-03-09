var React = require('react');

module.exports = React.createClass({
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
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCollectionsFromServer();
  },
  render: function() {
    var bookmarkUrl = jsonUrl + "/posts?filter[tag]=bookmark";

    var collections = this.state.data.map(function (collection) {
      return (
        <Collection data={collection} key={collection.id} />
      );
    });

    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ themeUrl + "/images/logo.png" } alt="logo" />
        </div>
        <ul className="links">
          <li>
            <a href={ homeUrl } className="active">All Posts</a>
          </li>
          <li>
            <a href={ bookmarkUrl }>Bookmarks</a>
          </li>
          <li>
            <a href="/">Images</a>
          </li>
          <li>
            <a href="/">Notes</a>
          </li>
          <li>
            <a href="/">Articles</a>
          </li>
        </ul>
        <ul className="collections">
          <li>
            <h5>COLLECTIONS</h5>
          </li>
        </ul>
        <ul>
          { collections }
        </ul>
      </section>
    );
  }
});

var Collection = React.createClass({
  render: function() {
    return (
      <li>
        <a href="" key={this.props.data.id}>{ this.props.data.name }</a>
      </li>
    );
  }
});
