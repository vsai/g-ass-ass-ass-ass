var editTabPage = function(nextTabId, page) {
    this.nextTabId = nextTabId;
    this.page = page;
    this.pageIndex = 0;

    this.setToOriginal();

    $("#continueEditBtn").on("click", function() {
        this.switchTo(this.pageIndex + 1);
        this.updateAppInfo();
    }.bind(this));
    $("#skipEditBtn").on("click", function() {
        this.exit();
        this.updateAppInfo();
    }.bind(this));
    $(".editNav").on("click", function(e) {
        var newIndexId = $(e.target).closest('.editNav').attr('id');
        this.switchTo(newIndexId.charAt(newIndexId.length - 1));
        this.updateAppInfo();
    }.bind(this));
}

editTabPage.prototype = {
    enter: function() {
        var firstElem = $("#editContent"+this.pageIndex);
        $(firstElem).css("display", "block");
        
        var title = $("#editLocation #edit"+this.pageIndex);
        $(title).addClass("selectedTitle");
    },
    
    switchTo: function(newIndex) {
        newIndex = newIndex * 1;    // make sure it's int
        if (newIndex >= 3) {
            this.exit();
        }
        else {
            var oldElem = $("#editContent"+this.pageIndex);
            var newElem = $("#editContent"+newIndex);
            $("#edit ol li").css("display", "none");
            $(newElem).css("display", "block");
            
            $("#edit"+this.pageIndex).removeClass("selectedTitle");
            $("#edit"+newIndex).addClass("selectedTitle");
            this.pageIndex = newIndex;
        }
    },
    
    exit: function() {
        $("#Middle").easytabs("select", this.nextTabId);
        var me = this;
    },
    
    setToOriginal: function() {
        $("#edit ol li").css("display", "none");
        $("#editLocation .editNav").removeClass("selectedTitle");
        $("#editContent0").css("display", "block");
        $("#edit0").addClass("selectedTitle");
    },

    updateAppInfo: function() {
        this.page.app.mpg = this.getMpgInfo();
        this.page.app.costPerGal = this.getCostPerGal();
        this.page.app.passengers = this.getPassengers();
    },

    getMpgInfo: function() {
        if($("#mpgInput").val()) {
            return $("#mpgInput").val();
        }
        if ($("#makeInput").val() && $("#modelInput").val()) {
            // Call API to find out mpg and return that
        }
        return 1.0;    //return avg value
    },

    getCostPerGal: function() {
        if ($("#costPerGallon").val()) {
            return $("#costPerGallon").val();
        }
        return 1.0;    //return avg value
    },

    getPassengers: function() {
        return {};
    },
}