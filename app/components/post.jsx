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

    // use the post excerpt if the content is too long
    if (content.length > 500) {
      content = this.props.data.excerpt.rendered.substring(0, 200) + "...";
    }

    return (
      <div data-post-id={this.props.data.id} className="post"
          onClick={this.handleClick}>
        <h5 dangerouslySetInnerHTML={{__html: title}} />
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }
});
