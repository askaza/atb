/* =========================================================
// jquery.panorama.js
// Author: OpenStudio (Arnault PACHOT)
// Mail: apachot@openstudio.fr
// Web: http://www.openstudio.fr
// Copyright (c) 2008 Arnault Pachot
// licence : GPL
========================================================= */

(function($) {
	$.fn.panorama = function(options) {
		this.each(function(){
			var settings = {
				viewport_width: 600,
				speed: 20000,
				direction: 'left',
				control_display: 'auto',
				start_position: 0,
				auto_start: true,
				mode_360: true
			};
			if(options) $.extend(settings, options);

			var elemWidth = parseInt($(this).attr('width'));
			var elemHeight = parseInt($(this).attr('height'));
			var currentElement = this;
			var panoramaViewport, panoramaContainer;
			var bMouseMove = false;
			var mouseMoveStart = 0;
			var mouseMoveMarginStart = 0;

			$(this).attr('unselectable','on')
				.css('position', 'relative')
				.css('-moz-user-select','none')
				.css('-webkit-user-select','none')
				.css('margin', '0')
				.css('padding', '0')
				.css('border', 'none')
				.wrap("<div class='panorama-container'></div>");
			if (settings.mode_360)
				$(this).clone().insertAfter(this);



			panoramaContainer = $(this).parent();
			panoramaContainer.css('height', elemHeight+'px').css('overflow', 'hidden').wrap("<div class='panorama-viewport'></div>").parent().css('width',settings.viewport_width+'px')
				.append("<a href='#' class='panorama-control-left'><<</a> <a href='#' class='panorama-control-right'>>></a> ");

			panoramaViewport = panoramaContainer.parent();

			panoramaViewport.css('height', elemHeight+'px').css('overflow', 'hidden').find('a.panorama-control-left').bind('click', function() {	
				$(panoramaContainer).stop();
				settings.direction = 'right';
				animate_left(panoramaContainer, elemWidth, settings);
				return false;
			});
		
			
			panoramaViewport.find('a.panorama-control-right').bind('click', function() {
				$(panoramaContainer).stop();
				settings.direction = 'left';
				animate_right(panoramaContainer, elemWidth, settings);
				return false;
			});
			
			$(this).parent().css('margin-left', '-'+settings.start_position+'px');

			if (settings.auto_start)
				panorama_animate(panoramaContainer, elemWidth, settings);
			
				$(window).resize(function() {
				var windowsize = $(window).width();
				$('.panorama-viewport').width(windowsize);
				$('.panorama-container').css('margin-left', '0');
		});

		});

		

		function animate_right (element, elemWidth, settings) {
			currentPosition = parseInt($(element).css('margin-left'));
		    var rightlimit;
		    rightlimit = elemWidth - $(window).width();

		    if ( currentPosition - 300 < -rightlimit) {
			 $(element).animate({marginLeft: -rightlimit}, ((settings.speed / elemWidth)*300) , 'easeInOutCubic');
		    } else {
			$(element).animate({marginLeft: currentPosition - 400}, ((settings.speed / elemWidth)*300) , 'easeInOutCubic');
		    }
		}

		  function animate_left (element, elemWidth, settings) {		
		   currentPosition = parseInt($(element).css('margin-left'));

		    if ( currentPosition + 400 > 0) {
			 $(element).animate({marginLeft: 0}, ((settings.speed / elemWidth)*300) , 'easeInOutCubic');
		    } else {
			$(element).animate({marginLeft: currentPosition + 400}, ((settings.speed / elemWidth)*300) , 'easeInOutCubic');
		    }
		  }


		function panorama_animate(element, elemWidth, settings) {
		    currentPosition = 0-parseInt($(element).css('margin-left'));
		    var rightlimit;
		    if (settings.direction == 'right') {

		$(element).animate({marginLeft: 0}, ((settings.speed / elemWidth) * (currentPosition)) , 'linear', function (){
		    settings.direction = 'left';
		    panorama_animate(element, elemWidth, settings);
		});
		     } else {
		rightlimit = elemWidth-settings.viewport_width;
		$(element).animate({marginLeft: -rightlimit}, ((settings.speed / rightlimit) * (rightlimit - currentPosition)), 'linear', function (){
		    settings.direction = 'right';
		    panorama_animate(element, elemWidth, settings);
		});
	    }
	}

	
    };

})(jQuery);