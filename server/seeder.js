Meteor.startup(function() {
  Messages.remove({});
  Chatrooms.remove({});

  var user = Meteor.users.findOne();
  if(typeof user !== "undefined"){
      Factory.define('message', Messages, {
        text: function() {
            return Fake.sentence();
        },
        user: Meteor.users.findOne()._id,
        timestamp: Date.now(),
        chatroom: 'San Jose'
      });
      if (Messages.find({}).count() === 0) {
        _(5).times(function(n) {
          Factory.create('message');
        });
      }
  }

  Chatrooms.insert({
    name: "San Jose"
  });
  Chatrooms.insert({
    name: "San Diego, CA"
  });
  Chatrooms.insert({
    name: "Los Angeles"
  });
 
  Chatrooms.insert({
    name: "Miami, FL"
  });
  Chatrooms.insert({
    name: "Honolulu, HI"
  });
});