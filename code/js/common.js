$(document).ready(function() {

	var windowsize = $(window).width();
	$('.panorama__img').panorama({
	    viewport_width: windowsize,
	    speed: 30000,
	    direction: 'left',
	    control_display: 'yes',
	    mode_360: false
	});

});

