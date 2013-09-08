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
        var mapHandler = new gmapsHandler(this);

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
        });

        $("#gmapsGetMilesBtn").on("click", function() {
            var origin = $("#address0").val();
            var destination = $("#address1").val();
            if (origin.length === 0 || destination.length === 0) {
                alert("Add origin and destination");
                return;
            }
            mapHandler.getDistance(origin, destination);
        });

        $("#gmapsSubmitBtn").on("click", function() {
            this.app.switchPage("Payment");
        });
	},

	exit: function() {
		$("#Middle").css("display", "none");
	},

    receiveMiles: function(miles) {
        $("#gmapsMiles").html(Math.round(miles*100)/100);
        this.app.miles = miles;

        var totalCost = this.app.miles / this.app.mpg * this.app.costPerGal;
        if (this.app.passengers.length === 0) {
            alert("Need to add passengers");
            return;
        } else {
            this.app.perPersonCost = totalCost / (this.app.passengers.length * 1.0);
        }
    }

}

