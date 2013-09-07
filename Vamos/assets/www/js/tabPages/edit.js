var editTabPage = function(returnTo) {
    this.returnTo = returnTo;
    this.pageIndex = 0;
    var me = this;
    this.setToOriginal();
    $("#continueEditTab").on("click", function() {
        me.pageIndex += 1;
        me.switchTo(me.pageIndex);
    });
    $("#skipEditTab").on("click", function() {
        me.exit();
    });
}

editTabPage.prototype = {
    enter: function() {
        this.pageIndex = 0;
        var index = this.pageIndex + 1;
        var firstElem = $("#edit ol li:nth-of-type(" + index + ")");
        $(firstElem).css("display", "block");
        
        var title = $("#editLocation > h3:nth-of-type(" + index + ")");
        $(title).addClass("selectedTitle");
    },
    
    switchTo: function(newIndex) {
        var index = newIndex + 1;
        if (index > 3) {
            this.exit();
        }
        else {
            var oldElem = $("#edit ol li:nth-of-type(" + newIndex + ")");
            var newElem = $("#edit ol li:nth-of-type(" + index + ")");
            $("#edit ol li").css("display", "none");
            $(newElem).css("display", "block");
            
            
            $("#editLocation > h3").removeClass("selectedTitle");
            var title = $("#editLocation > h3:nth-of-type(" + index + ")");
            $(title).addClass("selectedTitle");
        }
    },
    
    exit: function() {
        var returnTo = this.returnTo;
        $("#Middle").easytabs("select", returnTo); 
        var me = this;
        setTimeout(function() {me.setToOriginal()}, 1000);
    },
    
    setToOriginal: function() {
        $("#edit ol li").css("display", "none");
        $("#editLocation > h3").removeClass("selectedTitle");
        $("#edit ol li:first-child").css("display", "block");
        $("#editLocation > h3:first-child").addClass("selectedTitle");
    }
}