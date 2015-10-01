var userId = Meteor.userId();
var conn;
video = function() {
	console.log(userId);
	this.peer = new Peer({ userId: userId, key: 'jnslu6wnd2273nmi', debug: 3});
	conn = this.peer.connect(this.peer.id, {metadata: {userId: userId}});
	console.log(conn);
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
		$('#partnervideo').prop("src", URL.createObjectURL(stream));
	});

	this.ui.enterCall();
	this.currentCall = call;
};

video.prototype.callAKey = function(key) {
	// var call = this.peer.call(key, window.localStream);
	var call = this.peer.call(key, window.localStream);
	console.log(key);
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
	this.peer.on('open', function(key) {
		$(".key").html("Your key is: " + key);
		that.getUserVideo();
		// console.log(id);
	});
};

video.prototype.bindOnCall = function() {
	var that = this;
	this.peer.on('call', function(call) {
		call.answer(window.localStream);
		that.setPartnerVideo(call);
		var callerId = conn.metadata.userId;
		console.log("WHAT");
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
video.prototype.getCallerId = function() {
	// this.peer.on('connection', function(conn){
	// 	var callerId = conn.metadata.userId;
	// 	console.log("WHAT");
	// });
};

video.prototype.run = function() {
	this.bindOnOpen();
	this.bindOnCall();
	this.bindOnError();
	this.bindOnClose();
	this.getCallerId();
};

