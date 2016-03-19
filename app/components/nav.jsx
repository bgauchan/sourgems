var React = require('react');

module.exports = React.createClass({
  searchPosts: function(event) {
    if(event && event.keyCode == 13) // 13 == return/enter
    {
      var url = this.props.jsonUrl + "&search=" + event.target.value;
      this.props.onUrlChange(url, "Search Results");
    } 
    else if(event.target.value === "" && event.keyCode == 8) {  // 8 == delete/backspace
      url = this.props.jsonUrl;
      this.props.onUrlChange(url, "All Posts");
    }
  },
  render: function() {
    return (
      <nav className="main-nav">
        <section className="container">
        	<div className="search-bar">
        		<img className="search-icon" src={ themeUrl + "/images/search.svg" } alt="search icon"/>
        		<input id="search-box" type="text" placeholder="Search" 
              onKeyUp={this.searchPosts} />
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
