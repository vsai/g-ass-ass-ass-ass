var OdometerPage = function(app){
	this.app = app;
	this.string = "Odometer";
}

OdometerPage.prototype = {
	enter: function() {
		$("#Middle").css("display", "block");
		$("#tmpMiddle").html('On Odometer Page');
		// Handle tabs to show
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

