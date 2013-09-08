var OdometerPage = function(app){
	this.app = app;
	this.string = "Middle";
    this.navHTML = "<li class='tab onlyTwoTabs'><a href='#edit'>Edit</a></li>" + 
            "<li class='tab onlyTwoTabs'><a href='#odomMain'>Odom Main</a></li>";
}

OdometerPage.prototype = {
	// Event Handler for clicks
	enter: function() {
        this.editState = new editTabPage("#odomMain");

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
        var me = this;
        $("#Middle").bind('easytabs:after', function(elem, b) {
            var newTabName = b[0].innerHTML;
            if (newTabName === "Edit") {
                me.editState.enter();
            }
        });

        $("#odometerCalculateBtn").on("click", function() {
        	var start = $("#startMileageInput").val();
        	var end = $("#endMileageInput").val();
        	if (start.length > 0 &&
        		end.length > 0 && end - start > 0) {
        		this.app.miles = end - start;
        	} else if ($("#odometerMilesTraveled").val().length > 0) {
        		this.app.miles = $("#odometerMilesTraveled").val();
        	} else {
        		alert("Please enter valid information.");
        		return;
        	}

        	if (this.app.passengers.length === 0) {
        		// alert users that they need to fill in the passengers
        		//return
        	}
        	this.app.perPersonCost = this.app.miles / (this.app.passengers.length * 1.0);
        	this.app.switchPage("Payment");
        }.bind(this));
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},



}

