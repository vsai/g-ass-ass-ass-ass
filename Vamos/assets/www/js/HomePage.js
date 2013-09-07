var HomePage = function(app){
	this.app = app;
	this.string = "Home";

	$('.homeBtn').on('click', function(e) {
		var btnId = $(e.target).closest('.homeBtn').attr("id");
		this.app.switchPage(btnId.replace(/Link$/, ""));
	}.bind(this));
}

HomePage.prototype = {
	enter: function() {
		$("#"+this.string).css("display", "block");
	},

	exit: function() {
		$("#"+this.string).css("display", "none");
	},

}

