<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package sourgems
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.2/masonry.pkgd.min.js"></script>
<script type="text/javascript">
	var themeUrl = '<?= get_bloginfo("template_url"); ?>';
	var homeUrl = '<?php echo get_site_url(); ?>';

	var jsonUrl = homeUrl + "/wp-json/wp/v2";
</script>
</head>

<body>
<main id="main" class="site-main" role="main">

</main><!-- #main -->

</body>
<section class="modal">
	<input class="close-btn" type="button" value="CLOSE" onclick="
		jQuery('.modal').hide();
		jQuery('body').css('position', 'relative');"/>
	<div class="body">
		<h4></h4>
		<div class="content"></div>
	</div>
</section>
<?php wp_footer(); ?>
