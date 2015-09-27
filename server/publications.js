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