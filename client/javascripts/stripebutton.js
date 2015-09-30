$(document).ready(function() {
	function changeButton(){
		$('.stripe-button-el').addClass('btn btn-info btn-stripe center-block').removeClass('stripe-button-el');
		$('.btn-stripe').children().css('min-height', '');
		$('.btn-stripe').children().css('display', '');
	}
	setInterval(changeButton, 100);

});


