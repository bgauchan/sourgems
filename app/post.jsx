var React = require('react');

module.exports = React.createClass({
  handleClick: function(event) {
    jQuery('body').css('position', 'fixed');
    jQuery('.modal').show();
    jQuery('.modal h4').html(this.props.data.title.rendered);
    jQuery('.modal .content').html(this.props.data.content.rendered);
  },
  render: function() {
    var content = this.props.data.content.rendered;
    var title = this.props.data.title.rendered;

    // wordpress posts title has wierd issues with single quote
    // so we convert the code back to single quote
    title = title.replace("&#8217;", "'");

    // use the post excerpt if the content is too long
    if (content.length > 240) {
      content = this.props.data.excerpt.rendered.substring(0, 140) + "...";
    }

    return (
      <div data-post-id={this.props.data.id} className="post"
          onClick={this.handleClick}>
        <h5> {title}</h5>
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }
});
