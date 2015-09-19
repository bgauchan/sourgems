var React = require('react');

module.exports = React.createClass({
  render: function() {
    var content = this.props.data.content.rendered;
    var title = this.props.data.title.rendered;
    title = title.replace("&#8217;", "'");

    if (content.length > 240) {
      content = this.props.data.excerpt.rendered.substring(0, 140) + "...";
    }

    return (
      <div className="post">
        <h5>{ title }</h5>
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }
});
