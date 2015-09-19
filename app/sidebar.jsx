var React = require('react');

module.exports = React.createClass({
  render: function() {
    var logoUrl = themeUrl + "/images/logo.png"
    return (
      <section className="sidebar">
        <div className="logo">
          <img src={ logoUrl } alt="logo" />
        </div>
        <ul className="links">
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </section>
    );
  }
});
