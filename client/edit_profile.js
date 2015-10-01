Template.dashboard.events({
  'submit #profileForm': function (event) {
    console.log("hi");
    event.preventDefault();
    var data = event.target;
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.name": data.name.value, "profile.occupation": data.occupation.value, "profile.location": data.location.value, "profile.birthdate": data.birthdate.value, "profile.phone": data.phone.value, "profile.description": data.description.value}});
	}
});