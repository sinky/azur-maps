<?php  
/* 
Plugin Name: Azur Maps
Plugin URI: http://my-azur.de
Version: 0.1
Author: Marco Krage
Author URI: http://my-azur.de
Description: Show a map in post
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

function azur_maps_scripts() {
  wp_enqueue_script('google-maps', 'https://maps.googleapis.com/maps/api/js?v=3.9', array(), 0, true);
  wp_enqueue_script('azur-maps', plugins_url('azur-maps.js', __FILE__ ), array(), 0, true);
}
add_action( 'wp_enqueue_scripts', 'azur_maps_scripts' );

if(!function_exists('azur_adminbar_map')) {
  function azur_adminbar_map() {
    global $wp_admin_bar;
    $wp_admin_bar->add_menu( array(
      'parent' => false,
      'id' => 'azur-map',
      'title' => 'Azur-Map',
      'href' => plugins_url('map.html', __FILE__ ),
      'meta' => array('target' => '_blank')
    ));
  }
  add_action( 'wp_before_admin_bar_render', 'azur_adminbar_map' );
}