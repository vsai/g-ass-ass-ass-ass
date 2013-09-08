var PaymentPage = function(app){
	this.app = app;
}

PaymentPage.prototype = {
	enter: function() {
        $("#Payment").css("display", "block");
    },
    exit: function() {}
}