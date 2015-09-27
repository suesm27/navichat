Meteor.startup(function() {
  Factory.define('message', Messages, {
      text: function() {
          return Fake.sentence();
      },
      user: Meteor.users.findOne()._id,
      timestamp: Date.now(),
      chatroom: 'San Jose'
  });

  //removing all messages when server restarts
  Messages.remove({});

  if (Messages.find({}).count() === 0) {
    _(5).times(function(n) {
      Factory.create('message');
    });
  }

  Chatrooms.remove({});
  Chatrooms.insert({
    name: "San Jose"
  });
  Chatrooms.insert({
    name: "San Diego"
  });
  Chatrooms.insert({
    name: "Los Angeles"
  });
  Chatrooms.insert({
    name: "New York City"
  });
  Chatrooms.insert({
    name: "Seattle"
  });
  Chatrooms.insert({
    name: "Minneapolis"
  });

});