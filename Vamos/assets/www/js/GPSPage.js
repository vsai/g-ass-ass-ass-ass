var GPSPage = function(app){
	this.app = app;
	this.string = "Middle";
}

GPSPage.prototype = {
	// Event Handler for clicks
	enter: function() {
		$("#" + this.string).css("display", "block");
		
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
		$("#"+this.string).css("display", "none");
	},

}

