Meteor.methods({
	getGeocode: function(address) {
		var geo = new GeoCoder();
		var result = geo.geocode(address);
		var temp = {"latitude": result[0].latitude, "longitude" : result[0].longitude};
		return temp;
	}
})