var OdometerPage = function(app){
	this.app = app;
	this.string = "Middle";
    this.navHTML = "<li class='tab onlyTwoTabs'><a href='#edit'>Edit</a></li>" + 
            "<li class='tab onlyTwoTabs'><a href='#odomMain'>Odom Main</a></li>";
}

OdometerPage.prototype = {
	// Event Handler for clicks
	enter: function() {
		$("#Middle").css("display", "block");
		//Handle tabs to show
        
        //Now we need to set up the nav bar and the appropriate pages
		$("#odomMain").css("display", "block");
		$("#edit").css("display", "block");
		//Now make sure the nav appears
		$("#nav").css("display", "block");
        $("#nav").append(this.navHTML);
		//Set up easy tabs!
		$("#Middle").easytabs();
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

}

