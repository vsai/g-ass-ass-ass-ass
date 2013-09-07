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
        this.editState = new editTabPage("#GPSMain");
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
	},

	exit: function() {
		$("#Middle").css("display", "none");
		this.watchID = null;
	},

	setupGPS: function() {
		var options = {timeout:15000, enableHighAccuracy:true};
		watchID = navigator.geolocation.watchPosition(
			this.onSuccess,
			this.onError,
			options
		);

	},

	onSuccess: function(position) {

	},

	onError: function(error) {

	},

}

