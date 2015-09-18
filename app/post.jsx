var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="post">
        <h5>{ this.props.data.title }</h5>
        <div className="" dangerouslySetInnerHTML={{__html: this.props.data.content.rendered}} />
      </div>
    );
  }
});
