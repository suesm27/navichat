Router.configure({
  layoutTemplate: 'app'
});

Router.route('/', function () {
    this.redirect('/San Jose');
});

Router.route('/:chatroom', function () {
    Session.set('chatroom', this.params.chatroom);
    this.render('messages');
});