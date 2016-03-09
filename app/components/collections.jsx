
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
    var collections = this.state.data.map(function (collection) {
      return (
        <Collection data={collection} key={collection.id} />
      );
    });

    return (
      <ul className="collections">
        <li>
          <h5>COLLECTIONS</h5>
        </li>
        { collections }
      </ul>
    );
  }
});

var Collection = React.createClass({
  render: function() {
    return (
      <li>
        <a href="">{ this.props.data.name }</a>
      </li>
    );
  }
});