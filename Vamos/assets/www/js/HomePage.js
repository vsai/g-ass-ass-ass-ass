var HomePage = function(app){
	this.app = app;
	this.string = "Home";
    var me = this;
	$('.homeBtn').on('click', function(e) {
        if (window.deviceReady) {
            var btnId = $(e.target).closest('.homeBtn').attr("id");
            //setTimeout(function() {me.app.switchPage(btnId.replace(/Link$/, ""))}, 50);
            me.app.switchPage(btnId.replace(/Link$/, ""));
            document.API.venmoHandler.venmoConnect();
        }
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

