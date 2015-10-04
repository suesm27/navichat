Meteor.startup(function() {
  // $(window).resize(function() {
  //   $('#map').css('height', '200px');
  //   $('#map').css('width', '500px');
  // });
  // $(window).resize();
});

Meteor.subscribe('markers');

Template.map.rendered = function() {
  $( "#mapContainer").empty();
  $( "#mapContainer").append("<div id='map'></div>");
  var chatroom = Chatrooms.findOne({name: Session.get('currentWindow')});
  if (typeof chatroom !== "undefined") {
    var chatroomName = Session.get('currentWindow');

    try{
      Meteor.call('getGeocode', chatroomName, function(error, result){
        Session.set('geocodeResult', result);
        $('#map').css('height', '400px');
        $('#map').css('width', '100%');
        L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';

        var latitude = Session.get('geocodeResult').latitude;
        var longitude = Session.get('geocodeResult').longitude;
        try{
          var map = L.map('map', {
            doubleClickZoom: false,
            scrollWheelZoom: false
          }).setView([latitude, longitude], 13);

          // L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
          L.tileLayer.provider('MapQuestOpen.OSM').addTo(map);

          map.on('dblclick', function(event) {
            Meteor.call('newMarker', event.latlng);
          });
          var query = Markers.find();
          query.observe({
            added: function (document) {
              var marker = L.marker(document.latlng).addTo(map)
              .on('click', function(event) {
                map.removeLayer(marker);
                Meteor.call('removeMarker', document._id);
              });
            },
            removed: function (oldDocument) {
              layers = map._layers;
              var key, val;
              for (key in layers) {
                val = layers[key];
                if (val._latlng) {
                  if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
                    map.removeLayer(val);
                  }
                }
              }
            }
          });
        }
        catch(e){
          console.log("map has already been initialized.");
        }
      });
    }
    catch(e) {
      console.log("problem with the geocode");
    }
  }
  else{
    return false;
  }
};