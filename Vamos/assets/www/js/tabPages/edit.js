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
    $("#makeButton").on("click", function() {
        var year = $("#yearInput").val();
        var make = $("#makeInput").val();
        var model = $("#modelInput").val();
        getMPG(year, make, model);
        var strmpg = $("#mpgInput").html();
        if (strmpg.length > 0) {
            $("#mpgManualInput").html(strmpg.substring(0, strmpg.length - 3));
        }
    });
    $("#costPerGallon").bind("keyup", function() {
        $(".firstGasPoint").data("price", $("#costPerGallon").val());
    });

    $(".bottomMost").bind("keyup", function(event) {
	    //alert($('.bottomMost').val());
        if ($(".bottomMost").val() == "") {
            $('#friendResults').html('');
            $("#friendResults").css("display", "none");
        }
        else {
	        //alert($('.bottomMost').val());
            var searchFriendsQuery = $(".bottomMost").val().toLowerCase();
            var x = [].concat(document.API.venmoHandler.myFriends);
            x = x.filter(function(elem){
                return (elem['display_name'].toLowerCase().indexOf(searchFriendsQuery) !== -1);
            });
            var friendsHTML = '';
            //alert('filtered list length: ' + x.length);
            for (var i=0; i<x.length; i++) {
                //alert(x[i]['id']);
                this.page.app.passengers[this.page.app.passengers.length] = (x[i]['id']);
                friendsHTML += '<div class="friendName">'+x[i]['display_name']+'</div>';
                if (i>=4) break; //don't populate more than 5 elements in the list
            }
            $("#friendResults").html(friendsHTML);
            $("#friendResults").css("display", "block");
            $("#friendResults .friendName").on("click", function () {
                if ($(this).html() !== "") {
                    var newField = document.createElement("input");
                    $(newField).attr("type", "text");
                    $(newField).attr("value", $(this).html());
                    $(newField).attr("disabled", "disabled");
                    $(".bottomMost").before(newField);
                    $(newField).addClass("passengerName");
                    $(".bottomMost").val("");
                    $(".bottomMost").attr("placeholder", "Add a passenger");
                    $("#friendResults").css("display", "none");
                }
            });
        }
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
        this.page.updateUI();
    },

    getMpgInfo: function() {
        if($("#mpgManualInput").val().length > 0) {
            return $("#mpgManualInput").val();
        }
        return 1.0;    //return avg value
    },

    getCostPerGal: function() {
        if ($("#costPerGallon").val().length > 0) {
            return $("#costPerGallon").val();
        }
        return 1.0;    //return avg value
    },

    getPassengers: function() {
        return {};
    },
}
