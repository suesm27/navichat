Meteor.startup(function () {
  smtp = {
    username: 'suesm27@gmail.com',
    password: 'gZ3O72Iz1EDagH9Iko8mnA',
    server:   'smtp.mandrillapp.com',
    port: 587
 };
    
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});