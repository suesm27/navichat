Meteor.startup(function () {
    _.extend(Notifications.defaultOptions, {
        timeout: 4000
    });
});