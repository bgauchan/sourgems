<?php

/**
*
* Enqueue scripts and styles for admin panel.
*
*/
function admin_css() {
  echo '<style>

  body, td, textarea, input, select { font-family: "Roboto"; }
  #wpadminbar a { font-family: "Roboto"; }
  #wpadminbar { padding: 8px 0; background: #26292c; }
  #wpcontent { margin-top: 15px; }
  #wpbody { padding-top: 20px; }
  #adminmenu li { padding: 2px 0; }

  span.ab-label { font-family: "Roboto" !important; }
  </style>';
}
add_action('admin_head', 'admin_css');

/**
*
* Enqueue scripts and styles.
*
*/
function sourgems_scripts() {

  // Load our main stylesheet.
  wp_enqueue_style( 'style', get_stylesheet_uri() );
  wp_enqueue_script( 'jquery' );
}
add_action( 'wp_enqueue_scripts', 'sourgems_scripts' );

?>
