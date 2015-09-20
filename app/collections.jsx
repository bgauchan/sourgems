var React = require('react');

module.exports = React.createClass({
  render: function() {
    var collections = this.props.data.map(function (collection) {
      return (
        <li>
          <a href="/">{ collection.name }</a>
        </li>
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
