function getMPG(year, make, model) {
    $.getJSON("http://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims" + "callback=?", 
        {cmd:"getTrims", year: year, make:make, model:model}, function(result) {
            processRes(result);
        }
    );
}

function processRes(result) {
    result = result["Trims"];
    for (var i = 0; i < result.length; i++) {
        var curCar = result[i];
        var curID = curCar["model_id"];
        var resulter = getMPGfromModel(curID);
    }
}

function getMPGfromModel(model_id) {
    $.ajaxSetup({
        async: false
    });
    $.getJSON("http://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel" + "callback=?", 
        {cmd:"getModel", model:model_id}, function(result) {
            console.log(result);
            var hwy = result[0]["model_mpg_hwy"];
            var mixed = result[0]["model_mpg_mixed"];
            var city = result[0]["model_mpg_city"];
            var html = $("#displayMPG").html();
            if (html === "") {
                if (mixed !== null) {
                    $("#displayMPG").html(mixed);
                    return 1;
                }
                if (hwy !== null) {
                    $("#displayMPG").html(hwy);
                    return 1;
                }
                if (city !== null) {
                    $("#displayMPG").html(city);
                    return 1;
                }
            }
        }
    );
}