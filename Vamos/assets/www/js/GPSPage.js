var GPSPage = function(app){
	this.app = app;
	this.string = "GPS";
}

GPSPage.prototype = {
	// Event Handler for clicks
	enter: function() {
		$("#"+this.string).css("display", "block");
	},

	exit: function() {
		$("#"+this.string).css("display", "none");
	},

}

