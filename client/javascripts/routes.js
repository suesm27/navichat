Router.configure({
	layoutTemplate: 'app',
	loadingTemplate: 'loading'
});

Router.route('/', function () {
    this.render('instruction');
},{
	layoutTemplate: 'app' 
});

Router.route('/chatrooms/:chatroom', function () {
	Session.set('currentWindow', this.params.chatroom);
	this.render('messages');
},{
	layoutTemplate: 'app' 
});

Router.route('/users/profile/:user', function () {
	Session.set('currentWindow', this.params.user);
	this.render('profile');
},{
	layoutTemplate: 'app' 
});

Router.route('/users/dashboard/:user', function () {
	Session.set('currentWindow', this.params.user);
	this.render('dashboard');
},{
	layoutTemplate: 'app' 
});

Router.route('/video_chat', function () {
	Session.set('currentWindow', this.params.user);
	this.render('video_chat');
},{
	layoutTemplate: 'app' 
});
