if (Meteor.isClient) {

  var new_video = new video();
  new_video.run();

  Template.call_other.events({
    'click .callaction' : function(e, t) {
      console.log("calling");
      e.preventDefault();
      var key = t.find('.callkey').value;
      new_video.callAKey(key);
      return false;
    }
  });

  Template.hangup.events({
    'click .hangupaction' : function(e, t) {
      e.preventDefault();
      new_video.hangup();
      return false;
    }
  });
  
}

if (Meteor.isServer)
{
  Meteor.startup(function () {
    // code to run on server at startup
  });
}