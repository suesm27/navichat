var userId = Meteor.userId();
video = function() {
	console.log(userId);
	this.peer = new Peer({userId: userId , key: 'jnslu6wnd2273nmi', debug: 3});
	// console.log(this.peer);
	this.ui = new Ui();
	this.currentCall = null;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};

video.prototype.getUserVideo = function() {
	// console.log("get user video");
	navigator.getUserMedia({audio: true, video: true}, function(stream){
		$('#myvideo').prop("src", URL.createObjectURL(stream));
		window.localStream = stream;
	}, function(){
		// alert("Error! Make sure to click allow when asked for permission by the browser");
	});
};

video.prototype.setPartnerVideo = function(call) {
	// console.log("hai");
	call.on('stream', function(stream){
		console.log("hello");

		$('#partnervideo').prop("src", URL.createObjectURL(stream));
	});

	this.ui.enterCall();
	this.currentCall = call;
};

video.prototype.callAKey = function(userId) {
	// var call = this.peer.call(key, window.localStream);
	var call = this.peer.call(userId, window.localStream);
    // if (window.existingCall) {
    //   window.existingCall.close();
    // }
    this.setPartnerVideo(call);
};

video.prototype.hangup = function() {

	// console.log("hangup");

	if (this.currentCall) {
		this.currentCall.close();
		this.ui.leaveCall();
	}
};

video.prototype.bindOnOpen = function() {
	var that = this;
	this.peer.on('open', function(userId) {
		$(".key").html(userId);
		that.getUserVideo();
		// console.log(id);
	});
};

video.prototype.bindOnCall = function() {
	var that = this;
	this.peer.on('call', function(call) {
		call.answer(window.localStream);
		that.setPartnerVideo(call);
	});
};

video.prototype.bindOnError = function() {
	this.peer.on('error', function(err){
		alert(err.message);
	});
};

// never fired ??
video.prototype.bindOnClose = function() {
	this.peer.on('close', function(err){
		this.ui.leaveCall();
	});
};

video.prototype.run = function() {
	this.bindOnOpen();
	this.bindOnCall();
	this.bindOnError();
	this.bindOnClose();
};

