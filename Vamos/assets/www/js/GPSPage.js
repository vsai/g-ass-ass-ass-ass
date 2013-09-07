var GPSPage = function(app){
	this.app = app;
	this.string = "Middle";
}

GPSPage.prototype = {
	enter: function() {
		$("#Middle").css("display", "block");
		$("#tmpMiddle").html('On GPS Page');
		// Handle tabs to show
		
		//Now we need to set up the nav bar and the appropriate pages
		$("#GPSMain").css("display", "block");
		$("#edit").css("display", "block");
		$("#travelLog").css("display", "block");
		//Now make sure the nav appears
		$("#nav").css("display", "block");
		//Set up easy tabs!
		$("#Middle").easytabs();
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

