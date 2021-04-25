$(document).ready(function(){
	$.fn.raty.defaults.path = '/images/'
	$('.star').raty({
		readOnly: true,

		score: function(data){
			return $(this).atrr('data-score')
		}
	})
	
	
})