var GMapsPage = function(app){
	this.app = app;
	this.string = "GMaps";
}

GMapsPage.prototype = {
	// Event Handler for clicks
	enter: function() {
		$("#Middle").css("display", "block");
		$("#tmpMiddle").html('On GMaps Page');
		//Handle tabs to show
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

