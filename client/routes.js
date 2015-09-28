Router.configure({
  layoutTemplate: 'app'
});

Router.route('/', function () {
    this.redirect('/chatrooms/San Jose');
});

Router.route('/chatrooms/:chatroom', function () {
    Session.set('currentWindow', this.params.chatroom);
    this.render('messages');
});

Router.route('/users/:user', function () {
    Session.set('currentWindow', this.params.user+"+"+Meteor.userId());
    this.render('messages');
});

