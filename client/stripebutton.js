$(document).ready(function() {
	function changeButton(){
		$('.stripe-button-el').addClass('btn btn-info').removeClass('stripe-button-el');
	}
	setInterval(changeButton, 100);
});