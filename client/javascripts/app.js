Meteor.subscribe('allUsernames');

Meteor.subscribe('chatrooms');

Meteor.subscribe('users');


//methods in registerHelper are available to all templates
Template.registerHelper("usernameFromId", function (userId) {
  var user = Meteor.users.findOne({_id: userId});
  if (typeof user === "undefined") {
    return "Anonymous";
  }
  if (typeof user.services.github !== "undefined") {
    return user.services.github.username;
  }
  if (typeof user.services.google !== "undefined") {
    return user.services.google.given_name;
  }
  if (typeof user.services.facebook !== "undefined") {
    return user.services.facebook.name;
  }
  if (typeof user.services.twitter !== "undefined") {
    return user.services.twitter.screenName;
  }
  return user.username;
});

Template.registerHelper("timestampToTime", function (timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.chatroom.onCreated(function() {
  var self = this;
  var chatroom_name = this.data.name;
  self.autorun(function() {
    Counts.has("messages_count", chatroom_name);
  });
});

Template.chatroom.helpers({
  active: function () {
    if (Session.get('currentWindow') === this.name) {
      return "active";
    } 
    else {
      return "";
    }
  },
  messages_count: function() {
    // return Counts.has("messages_count", this.name);
    return Counts.get("messages_count", this.name);
    // return Messages.find().count();
  }
});

Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('currentWindow'));
  });
});

Template.messages.helpers({
  messages: Messages.find(),
  getChatroomName: function () {
    var user = Meteor.users.findOne({username: Session.get('currentWindow')});
    if (typeof user === "undefined") {
      return Session.get('currentWindow');
    }
    else{
      return "Private chat with " + Session.get('currentWindow');
    }
  },
  getUserId: function () {
    return Meteor.userId();
  },
  settings: function() {
    return {
      position: "top",
      limit: 10,
      rules: [
      {
        token: '@',
        collection: Meteor.users,
        field: "_id",
        template: Template.userPill
      },
      {
        token: '/',
        collection: Meteor.api,
        field: "name",
        template: Template.userPill
      }
      ]
    };
  }
});

Template.listings.helpers({
  chatrooms: function () {
    return Chatrooms.find();
  },
  users: function () {
    return Meteor.users.find();
  }
});

Template.user.helpers({
  active: function () {
    if (Session.get('currentWindow') === this.userId) {
      return "active";
    } 
    else {
      return "";
    }
  },
  imageStatus: function () {
    if (this.status_idle)
      return "idle.png"
    else if (this.status_online)
      return "online.png"
    else
      return "offline.png"
  }
});

Template.header.helpers({
  getChatroomName: function () {
    var user = Meteor.users.findOne({username: Session.get('currentWindow')});
    if (typeof user === "undefined") {
      return Session.get('currentWindow');
    }
    else{
      return "Private chat with " + Session.get('currentWindow');
    }
  },
  getUserId: function () {
    return Meteor.userId();
  }
});

Template.myvideo.helpers({
  getUserId: function () {
    return Meteor.userId();
  }
});

Template.userPill.helpers({
  btnClass: function() {
    if (this.status.idle)
      return "btn-warning"
    else if (this.status.online)
      return "btn-success"
    else
      return "btn-danger"
  }
})

Template.message.helpers({
  getUserId: function () {
    return Meteor.userId();
  }
});

Template.profile.helpers({
  getUserId: function () {
    return Meteor.userId();
  },
  getProfileID: function () {
    return Session.get('currentWindow');
  }, 
  name: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).profile.name;
  },
  occupation: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).profile.occupation;
  },
  location: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).profile.location;
  },
  birthdate: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).profile.birthdate;
  },
  phone: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).profile.phone;
  },
  description: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).profile.description;
  },
  email: function () {
    return Meteor.users.findOne({_id: Session.get('currentWindow')}).emails.address;
  }
});

Template.dashboard.helpers({
  name: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).profile.name;
  },
  occupation: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).profile.occupation;
  },
  location: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).profile.location;
  },
  birthdate: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).profile.birthdate;
  },
  phone: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).profile.phone;
  },
  description: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).profile.description;
  },
  email: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).emails.address;
  }
});
