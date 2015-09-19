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
        <ul className="collections">
          <li>
            <h5>COLLECTIONS</h5>
          </li>
          <li>
            <a href="/">iPhone UI</a>
          </li>
          <li>
            <a href="/">Images</a>
          </li>
          <li>
            <a href="/">Articles</a>
          </li>
        </ul>
      </section>
    );
  }
});
