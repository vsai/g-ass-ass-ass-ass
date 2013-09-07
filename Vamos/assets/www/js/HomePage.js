var HomePage = function(app){
	this.app = app;
	this.string = "Home";

	$("#gpsLink").on('click', function() {
		this.app.switchPage("GPS");
	}.bind(this));
}

HomePage.prototype = {
	// Event Handler for clicks
	enter: function() {
		$("#"+this.string).css("display", "block");
	},

	exit: function() {
		$("#"+this.string).css("display", "none");
	},

}

