var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="main-nav">
        <section className="container">
        	<div className="search-bar">
        		<img className="search-icon" src={ themeUrl + "/images/search.svg" } alt="search icon"/>
        		<input type="text" placeholder="Search" />
        	</div>
        	<h4>{this.props.pageTitle}</h4>
        	<div className="filter-by">
	      		<ul>
	          		<li>Everything</li>
                <li className="hidden-nav">Favorites</li>
	          		<li className="hidden-nav">Bookmarks</li>
	          		<li className="hidden-nav">Images</li>
	          		<li className="hidden-nav">Notes</li>
	          		<li className="hidden-nav">Articles</li>
				</ul>
			</div>
        </section>
      </nav>
    );
  }
});
