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
        if (Session.get('currentWindow') === this.username) {

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
    getProfileName: function () {
       console.log(Meteor.userId());
    },
    getProfileID: function () {
        return Session.get('currentWindow');
    }
});

Template.registerHelper('getBody', function () {
  return Session.get('splashLoaded') ? 'app' : 'loading';
});

Template.loading.rendered = function () {
  // launch splash
  this.loading = window.pleaseWait({
    logo: '/images/pomelo-red.png',
    backgroundColor: pickRandom(backgrounds),
    loadingHtml: '<p class="loading-message">' + pickRandom(messages) + '</p>'
                + pickRandom(spinners)
  });

  // manually remove loading for demo
  var loading = this.loading;
  Meteor.setTimeout(function () {
    loading.finish();
    Session.set('splashLoaded', true);
  }, 5000);
};

Template.loading.destroyed = function () {
  this.loading.finish();
};


// --------------------------------------------------------
// Demo items
// --------------------------------------------------------
var pickRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


// Loading messages
var messages = [
  'Hey you. Welcome back!',
  'You look nice today',
  'Amazing things come to those who wait',
  'You usually have to wait for that which is worth waiting for',
  'Don\'t wait for opportunity. Create it.',
  'A day without sunshine is like, you know, night.',
  'My fake plants died because I did not pretend to water them.',
  'Weather forecast for tonight: dark.'
];

// Backgrounds
// var backgrounds = [ '#7f8c8d', '#1abc9c', '#2980b9', '#7f8c8d',
//                     '#f1c40f', '#27ae60', '#7f8c8d', '#7f8c8d' ];
var backgrounds = ['#2A3542'];

//
// Spinners from SpinKit
//   https://github.com/tobiasahlin/SpinKit/blob/master/css/spinkit.css
//
var spinners = [
  // spinner-rotating-plane
  '<div class="sk-spinner sk-spinner-rotating-plane"></div>',

  // spinner-double-bounce
  '<div class="sk-spinner sk-spinner-double-bounce">'
  + ' <div class="sk-double-bounce1"></div>'
  + ' <div class="sk-double-bounce2"></div>'
  + '</div>',

  // spinner-double-bounce
  '<div class="sk-spinner sk-spinner-wave">'
  + ' <div class="sk-rect1"></div>'
  + ' <div class="sk-rect2"></div>'
  + ' <div class="sk-rect3"></div>'
  + ' <div class="sk-rect4"></div>'
  + ' <div class="sk-rect5"></div>'
  + '</div>',

  // spinner-wandering-cubes
  '<div class="sk-spinner sk-spinner-wandering-cubes">'
  + ' <div class="sk-cube1"></div>'
  + ' <div class="sk-cube2"></div>'
  + '</div>',

  // spinner-pulse
  '<div class="sk-spinner sk-spinner-pulse"></div>',

  // spinner-chasing-dots
  '<div class="sk-spinner sk-spinner-chasing-dots">'
  + ' <div class="sk-dot1"></div>'
  + ' <div class="sk-dot2"></div>'
  + '</div>',

  // spinner-three-bounce
  '<div class="sk-spinner sk-spinner-three-bounce">'
  + '  <div class="sk-bounce1"></div>'
  + '  <div class="sk-bounce2"></div>'
  + '  <div class="sk-bounce3"></div>'
  + '</div>',

  // spinner-circle
  '<div class="sk-spinner sk-spinner-circle">'
  + '  <div class="sk-circle1 sk-circle"></div>'
  + '  <div class="sk-circle2 sk-circle"></div>'
  + '  <div class="sk-circle3 sk-circle"></div>'
  + '  <div class="sk-circle4 sk-circle"></div>'
  + '  <div class="sk-circle5 sk-circle"></div>'
  + '  <div class="sk-circle6 sk-circle"></div>'
  + '  <div class="sk-circle7 sk-circle"></div>'
  + '  <div class="sk-circle8 sk-circle"></div>'
  + '  <div class="sk-circle9 sk-circle"></div>'
  + '  <div class="sk-circle10 sk-circle"></div>'
  + '  <div class="sk-circle11 sk-circle"></div>'
  + '  <div class="sk-circle12 sk-circle"></div>'
  + '</div>',

  // spinner-cube-grid
  '<div class="sk-spinner sk-spinner-cube-grid">'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '  <div class="sk-cube"></div>'
  + '</div>',

  // spinner-wordpress
  '<div class="sk-spinner sk-spinner-wordpress">'
  + '  <span class="sk-inner-circle"></span>'
  + '</div>',

  // spinner-fading-circle
  '<div class="sk-spinner sk-spinner-fading-circle">'
  + '  <div class="sk-circle1 sk-circle"></div>'
  + '  <div class="sk-circle2 sk-circle"></div>'
  + '  <div class="sk-circle3 sk-circle"></div>'
  + '  <div class="sk-circle4 sk-circle"></div>'
  + '  <div class="sk-circle5 sk-circle"></div>'
  + '  <div class="sk-circle6 sk-circle"></div>'
  + '  <div class="sk-circle7 sk-circle"></div>'
  + '  <div class="sk-circle8 sk-circle"></div>'
  + '  <div class="sk-circle9 sk-circle"></div>'
  + '  <div class="sk-circle10 sk-circle"></div>'
  + '  <div class="sk-circle11 sk-circle"></div>'
  + '  <div class="sk-circle12 sk-circle"></div>'
  + '</div>'
];