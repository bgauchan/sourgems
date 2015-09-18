
var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Nav = require('./nav.jsx');
var Posts = require('./posts.jsx');

var url = document.URL;

var App = React.createClass({
  loadPostsFromServer: function() {
    jQuery.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar />
        <div className="content">
          <Nav />
          <Posts data={this.state.data} />
        </div>
      </div>
    );
  }
});

React.render(
  <App url={url + "/wp-json/wp/v2/posts"} pollInterval={200000} />,
  document.getElementById('main')
);

// <div id="page" class="site">
// 	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'sourgems' ); ?></a>
//
// 	<header id="masthead" class="site-header" role="banner">
// 		<div class="site-branding">
// 			<?php if ( is_front_page() && is_home() ) : ?>
// 				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
// 			<?php else : ?>
// 				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
// 			<?php endif; ?>
// 			<p class="site-description"><?php bloginfo( 'description' ); ?></p>
// 		</div><!-- .site-branding -->
//
// 		<nav id="site-navigation" class="main-navigation" role="navigation">
// 			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'sourgems' ); ?></button>
// 			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
// 		</nav><!-- #site-navigation -->
// 	</header><!-- #masthead -->
// </div>
