$(document).ready(function() {

	$('#date-range').click(function(){
		$(this).addClass('active-range');
		$('#range').show();
	});

	$(".data-field").click(function(e) {
		var target = $(e.currentTarget);
		var max = new Date(3000, 0, 0);
		var min = new Date(0, 0, 0);
		var curTest = null;
		
		
		$( "#range" ).datepicker({
				dateFormat: 'yy/mm/dd'});
				
		if(target.attr('id') == 'from'){
			curTest = max;
			if($('#to').val().length){
				curTest = new Date($('#to').val());
			}
			$( "#range" ).datepicker('change', {
				dateFormat: 'yy/mm/dd',
				onSelect: function(dateText, inst) {
					target.val(dateText);
				},
				maxDate: curTest,
				minDate: min
			});	
		} else {
			curTest = min;
			if($('#from').val().length){
				curTest = new Date($('#from').val());
			}

			$( "#range" ).datepicker('change', {
				minDate: curTest,
				dateFormat: 'yy/mm/dd',
				onSelect: function(dateText, inst) {
					target.val(dateText);
				},
				minDate: curTest,
				maxDate: max
			});
		}
		return false;		
	});


		
	$( "#tabs" ).tabs();
	
	$("#clients-select").selectbox();
	
	if ( $.browser.msie && $.browser.version < 9 ) {
		$('.ui-tabs-nav li a').append('<i class="tl"></i><i class="tr"></i>');	
		$('.payments').append('<i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i>');
		$('.equal-height__bottom .equal-height__column').append('<i class="bl"></i>');
	}
});

