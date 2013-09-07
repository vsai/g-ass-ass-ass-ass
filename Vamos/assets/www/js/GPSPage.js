var GPSPage = function(app){
	this.app = app;
	this.string = "Middle";
    this.navHTML = "<li class='tab'><a href='#edit'>Edit</a></li>" + 
				"<li class='tab'><a href='#GPSMain'>GPS Main</a></li>" + 
				"<li class='tab'><a href='#travelLog'>Travel Log</a></li>";
	this.watchID = null;
}

GPSPage.prototype = {
	enter: function() {
        this.editState = new editTabPage("#GPSMain", this);
        this.travelLog = new travelLogTabPage(this);
        this.editState.enter();
		$("#Middle").css("display", "block");
		// Handle tabs to show
		
		//Now we need to set up the nav bar and the appropriate pages
		$("#GPSMain").css("display", "block");
		$("#edit").css("display", "block");
		$("#travelLog").css("display", "block");
		//Now make sure the nav appears
		$("#nav").css("display", "block");
        $("#nav").append(this.navHTML);
		//Set up easy tabs!
		$("#Middle").easytabs();
        var me = this;
        $("#Middle").bind('easytabs:after', function(elem, b) {
            var newTabName = b[0].innerHTML;
            if (newTabName === "Edit") {
                me.editState.enter();
            }
        })

        this.setupGPS();

        $("#endTripBtn").on("click", function() {
        	if (this.app.passengers.length === 0) {
        		// Alert that passengers isn't filled out
        	}
        	// Confirmation, are you sure you want to use
        	// mpg (x) and $/gal ($) and passengers(x) for payment?
        	
        	this.endGPS();
        }.bind(this));
	},

	exit: function() {
		$("#Middle").css("display", "none");
		this.endGPS();
		this.latlons = {};
	},

	setupGPS: function() {
		var options = {timeout:15000, enableHighAccuracy:true};
		watchID = navigator.geolocation.watchPosition(
			this.onSuccess,
			this.onError,
			options
		);
		this.latlons = {}

	},
	endGPS:function() {
		if (this.watchID != null) {
			navigator.geolocation.clearWatch(this.watchID);
		}
		this.watchID = null;
	},

	onSuccess: function(position) {
		alert("hello");
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var prevLatLon = this.latlons[this.latlons.length - 1];
		var prevLat = prevLatLon[0];
		var prevLon = prevLatLon[1];
		if (lat === prevLat && lon === prevLon) return;

		var miles = this.getDistanceFromLatLonInMiles(
			prevLat,
			prevLon,
			lat,
			lons);

		$("#milesDisplay").html(miles);
		$("#mpgDisplay").html(this.app.mpg);
		$("costPerGalDisplay").html(this.app.costPerGal);

		var totalCost = miles / this.app.mpg * this.app.costPerGal;
		if (this.app.passengers.length === 0) {
			$("#perPersonCostContainer").css("display", "none");
		} else {
			var costPerPerson = this.app.passengers.length * 1.0;
			$("#perPersonCostContainer").html(totalCost / costPerPerson);
		}

		this.latlons.push([lat,lon]);
	},

	onError: function(error) {
		alert('AHHHHHHHH');
	},

	getDistanceFromLatLonInMiles: function(lat1,lon1,lat2,lon2) {
		if (lat1 === lat2 && lon1 === lon2) return 0;
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2);

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d * 0.621371;  // Distance in miles
	},

	deg2rad: function(deg) {
	  	return deg * (Math.PI/180)
	}

}



