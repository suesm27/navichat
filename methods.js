Meteor.methods({
  newChatMessage: function (message) {
    message.timestamp = Date.now();
    message.user = Meteor.userId();
    Messages.insert(message);
  },
  newMarker: function(latlng) {
  	Markers.insert({latlng: latlng});
  },
  removeMarker: function(id) {
  	Markers.remove({_id: id});
  }
})