Router.configure({
	layoutTemplate: 'app',
	loadingTemplate: 'loading'
});

Router.route('/', function () {
    // this.redirect('/chatrooms/San Jose');
    this.render('instruction');
});

Router.route('/chatrooms/:chatroom', function () {
	Session.set('currentWindow', this.params.chatroom);
	this.render('messages');
});

Router.route('/users/profile/:user', function () {
	Session.set('currentWindow', this.params.user);
	this.render('profile');
});

Router.route('/users/dashboard/:user', function () {
	Session.set('currentWindow', this.params.user);
	this.render('dashboard');
});
