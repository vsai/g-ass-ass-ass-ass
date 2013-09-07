var OdometerPage = function(app){
	this.app = app;
	this.string = "Odometer";
}

OdometerPage.prototype = {
	enter: function() {
		$("#Middle").css("display", "block");
		// Handle tabs to show
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

