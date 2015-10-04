Template.messages.events({
  'keypress input': function(e) {
    var inputVal = $('.input-box_text').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        Meteor.call('newChatMessage', {
          text: $('.input-box_text').val(),
          chatroom: Session.get('currentWindow')
        });
        $('.group-room').scrollTop( $('.group-room').prop("scrollHeight") );
        $('.input-box_text').val("");
        return false;
      }    
    }
  },
  'click #send-chat' : function (e) {
    var inputVal = $('.input-box_text').val();
    if(!!inputVal) {
      e.stopPropagation();
      Meteor.call('newChatMessage', {
        text: $('.input-box_text').val(),
        chatroom: Session.get('currentWindow')
      });
      $('.message-history').scrollTop( $('.message-history').prop("scrollHeight") );
      $('.input-box_text').val("");
      return false;
    }
  }
});

Template.listings.events({
  'keypress input': function(e) {
    var inputVal = $('#addChatroom').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        $('#addChatroom').prop('disabled', true);
        Meteor.call('getGeocode', inputVal, function(error, result){
          if(error){
            Notifications.error($('#addChatroom').val() + " is not a valid location!");
          }
          else{
            Meteor.call('newChatroom', {
              name: $('#addChatroom').val()
            });
            Notifications.success('Chatroom created successfully!');
          }
          $('#addChatroom').val("");
          $('#addChatroom').prop('disabled', false);
          return false;
        });
      }
    }
  },
  'click #chatroom_menu_item': function(event, template){
    Session.set('currentWindow', this.name);
    $( "#mapContainer").empty();
    $( "#mapContainer").append("<div id='map'></div>");
    Template.map.rendered();
  }
});

Template.profile.events({
  'click .btn-stripe': function (event, template) {
    Notifications.success('Payment', 'Thanks for your tip!');
  }
});

