var HomePage = function(app){
	this.app = app;
	this.string = "Home";
   // this.vhandler = new venmoHandler();
    var me = this;
	$('.homeBtn').on('click', function(e) {
        var btnId = $(e.target).closest('.homeBtn').attr("id");
        //setTimeout(function() {me.app.switchPage(btnId.replace(/Link$/, ""))}, 1000);
        //me.vhandler.venmoConnect();
        me.app.switchPage(btnId.replace(/Link$/, ""));
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

