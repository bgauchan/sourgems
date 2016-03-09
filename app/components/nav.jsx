var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="main-nav">
        <section className="container">
          <h4>{this.props.pageTitle}</h4>
        </section>
      </nav>
    );
  }
});
