Meteor.publish('messages', function (chatroom) {
    return Messages.find({chatroom: chatroom});
});

Meteor.publish("allUsernames", function () {
  return Meteor.users.find({}, {fields: {
    "username": 1,
    "services.github.username": 1,
    "services.google.given_name": 1,
    "services.facebook.name": 1,
    "services.twitter.screenName": 1
  }});
});

Meteor.publish('chatrooms', function () {
    return Chatrooms.find();
});

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.publish("markers", function () {
    return Markers.find();
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

// Listen to incoming HTTP requests, can only be used on the server
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});