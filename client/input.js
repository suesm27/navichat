Template.footer.events({
  'keypress input': function(e) {
    var inputVal = $('.input-box_text').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        Meteor.call('newChatMessage', {
          text: $('.input-box_text').val(),
          chatroom: Session.get('chatroom')
          });
        $('.input-box_text').val("");
        return false;
      }    
    }
  }
});