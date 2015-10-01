//This is really bad. 
//We are running these functions with a set interval so after jQuery finds the element in the page, it will update the CSS accordingly
//This is a workaround since these elements are generated dynamically and we dont know how to style them properly when they were first instantiated.

$(document).ready(function() {
	function changeButton(){
		$('.stripe-button-el').addClass('btn btn-info btn-stripe center-block').removeClass('stripe-button-el');
		$('.btn-stripe').children().css('min-height', '');
		$('.btn-stripe').children().css('display', '');
	}
	function fixProfilePicture() {
		$('img.avatar-image').css('width', '100%');
		$('img.avatar-image').css('height', '100%');
	}
	setInterval(changeButton, 100);
	setInterval(fixProfilePicture, 100);
});


