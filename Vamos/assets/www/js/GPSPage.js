var GPSPage = function(app){
	this.app = app;
	this.string = "GPS";
}

GPSPage.prototype = {
	enter: function() {
		$("#Middle").css("display", "block");
		$("#tmpMiddle").html('On GPS Page');
		// Handle tabs to show
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

