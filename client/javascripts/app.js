Template.messages.helpers({
  messages: Messages.find({}),
  getChatroomName: function () {
    var user = Meteor.users.findOne({username: Session.get('currentWindow')});
    if (typeof user === "undefined") {
      return Session.get('currentWindow');
    }
    else{
      return "Private chat with " + Session.get('currentWindow');
    }
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

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('messages');

Meteor.subscribe('allUsernames');

Meteor.subscribe('chatrooms');

Meteor.subscribe('users');

Template.chatroom.helpers({
  active: function () {
    if (Session.get('currentWindow') === this.name) {
      return "active";
    } 
    else {
      return "";
    }
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
  }
});

Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('currentWindow'));
  });

});

Template.messages.helpers({
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
        field: "username",
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

Template.myvideo.helpers({
  getUserId: function () {
    return Meteor.userId();
  }
});

Template.userPill.btnClass = function() {
  if (this.status.idle)
    return "btn-warning"
  else if (this.status.online)
    return "btn-success"
  else
    return "btn-danger"
};

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
  }
});