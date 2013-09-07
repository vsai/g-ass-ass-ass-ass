var App = function(){
	this.availablePages =
	{
		"Home": new HomePage(this),
		"GPS": new GPSPage(this),
		"GMaps": new GMapsPage(this),
		"Odometer": new OdometerPage(this)
		//"Payment": new PaymentPage(this)
	};
    this.API = {};
    this.API.venmoHandler = new venmoHandler();
	this.reset();
	this.currPageStr = "Home";
	this.currPage = this.availablePages[this.currPageStr];
	this.currPage.enter();
}

App.prototype = {
	switchPage: function(newPageStr) {
		if (this.currPageStr !== newPageStr) {
			this.currPage.exit();
			this.currPageStr = newPageStr;
			this.currPage = this.availablePages[newPageStr];
			this.currPage.enter();
		}
	},

	reset: function() {
		this.mpg = null;
		this.costPerGal = null;
		this.passengers = {};
		this.perPersonCost = null;
	},
}

