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
        $('.message-history').scrollTop( $('.message-history').prop("scrollHeight") );
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
        Meteor.call('getGeocode', inputVal, function(error, result){
          if(error){
            alert($('#addChatroom').val() + " is not a valid location!");
          }
          else{
            Meteor.call('newChatroom', {
              name: $('#addChatroom').val()
            });
          }
          $('#addChatroom').val("");
          return false;
        });
      }
    }
  }
});