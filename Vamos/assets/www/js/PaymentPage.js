var PaymentPage = function(app){
	this.app = app;
}

PaymentPage.prototype = {
	enter: function() {
        $("#Payment").css("display", "block");
        var total = this.calculateCosts();
        var totalMiles = $("#milesDisplay").html();
        $("#paymentMiles").html(Math.round(100*parseInt(totalMiles))/100);
        $("#paymentCost").html(Math.round(100*total)/100);
        $("#paymentPerPerson").html(Math.round((total/4)*100)/100);
        //ver perPerson = total / (this.app.passengers.length + 1);
    },
    exit: function() {},
    calculateCosts: function() {
        var total = 0;
        var me = this;
        $(".gasPoint").each(function() {
            var curPrice = me.extractPrice($(this).data("price"));
            var curDistance = $(this).html();
            curDistance = me.extractDistance(curDistance);
            var mpg = parseInt(me.app.mpg);
            total += (curDistance * (1/mpg) * (curPrice));
        });
        return Math.round(total*100) / 100;
    },
    extractDistance: function(str) {
        var patt = /[0-9]+\.[0-9]+/;
        return parseInt(str.match(patt)[0]);
    },
    extractPrice: function(str) {
        if (str.indexOf("$") !== -1) {
            return parseInt(str.substring(1));
        }
        else {
            return parseInt(str);
        }
    }
}