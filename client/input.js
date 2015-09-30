Template.footer.events({
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
            Notifications.error($('#addChatroom').val() + " is not a valid location!");
          }
          else{
            Meteor.call('newChatroom', {
              name: $('#addChatroom').val()
            });
            Notifications.success('Chatroom created successfully!');
          }
          $('#addChatroom').val("");
          return false;
        });
      }
    }
  }
});

Template.profile.events({
  'click .btn-stripe': function (event, template) {
    Notifications.success('Payment', 'Thanks for your tip!');
  }
});