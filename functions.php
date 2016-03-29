<?php

/**
*
* Enqueue scripts and styles for admin panel.
*
*/
function admin_css() {
  echo '
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
  
  <style>
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

function custom_theme_setup() {
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'custom_theme_setup' );

/**
*
* Enqueue scripts and styles.
*
*/
function sourgems_scripts() {

  // Load our main stylesheet.
  wp_enqueue_style( 'style', get_stylesheet_uri() );
  wp_enqueue_script( 'jquery' );

	wp_register_script( 'sourgems-script', get_template_directory_uri() . '/app.js', array(), '20150910', true );
	wp_enqueue_script( 'sourgems-script' );

  //localize data for script
  wp_localize_script( 'sourgems-script', 'AUTH', array(
      'root' => esc_url_raw( rest_url() ),
      'nonce' => wp_create_nonce( 'wp_rest' ),
      'current_user_id' => get_current_user_id()
    )
  );
}
add_action( 'wp_enqueue_scripts', 'sourgems_scripts' );

?>
