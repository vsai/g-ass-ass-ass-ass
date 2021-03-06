var PaymentPage = function(app){
	this.app = app;
}

PaymentPage.prototype = {
	enter: function() {
        $("#Payment").css("display", "block");
        //var total = this.calculateCosts();
        //var totalMiles = $("#milesDisplay").html();
        $("#paymentMiles").html(Math.round(100*this.app.miles)/100);
        //$("#paymentCost").html(Math.round(100*total)/100);
        //var perPerson = total / (this.app.passengers.length + 1);
        //this.perPersonCost = Math.round(perPerson*100)/100;

        this.perPersonCost =  this.app.perPersonCost;
        $("#paymentPerPerson").html(this.perPersonCost);
        this.makePayments();
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
    },
    makePayments: function() {
        passenger_ids = this.app.passengers;
        for (var i = 0; i < passenger_ids.length; i++) {
            var id = passenger_ids[i];
            var desc = 'We carpooled together! Vamos!';
            document.API.venmoHandler.makePayment(id, desc, this.perPersonCost);
        }
    },
}