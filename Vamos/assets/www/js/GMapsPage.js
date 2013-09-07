var GMapsPage = function(app){
	this.app = app;
	this.string = "Middle";
    this.navHTML = "<li class='tab onlyTwoTabs'><a href='#edit'>Edit</a></li>" + 
				"<li class='tab onlyTwoTabs'><a href='#GMapsMain'>Google Maps Main</a></li>";
}

GMapsPage.prototype = {
	// Event Handler for clicks
	enter: function() {
        this.editState = new editTabPage("#GMapsMain");

		$("#Middle").css("display", "block");
		//Handle tabs to show
        
        //Now we need to set up the nav bar and the appropriate pages
		$("#GMapsMain").css("display", "block");
		$("#edit").css("display", "block");
		//Now make sure the nav appears
		$("#nav").css("display", "block");
        $("#nav").append(this.navHTML);
		//Set up easy tabs!
		$("#Middle").easytabs();
        var me = this;
        $("#Middle").bind('easytabs:after', function(elem, b) {
            var newTabName = b[0].innerHTML;
            if (newTabName === "Edit") {
                me.editState.enter();
            }
        })
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

