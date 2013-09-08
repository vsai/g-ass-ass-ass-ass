function getMPG(year, make, model) {
    $.getJSON("http://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims" + "callback=?", 
        {cmd:"getTrims", year: year, make:make, model:model}, function(result) {
            processRes(result);
        }
    );
    $.ajaxSetup({
        async: true
    });
}

function processRes(result) {
    if (result !== undefined) {
        console.log(result);
        result = result["Trims"];
        if (result !== undefined) {
            for (var i = 0; i < result.length; i++) {
                var curCar = result[i];
                var curID = curCar["model_id"];
                var resulter = getMPGfromModel(curID);
            }
        }
    }
}

function getMPGfromModel(model_id) {
    $.ajaxSetup({
        async: false
    });
    var target = "#mpgInput";
    $.getJSON("http://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel" + "callback=?", 
        {cmd:"getModel", model:model_id}, function(result) {
            if (result !== undefined) {
                var hwy = result[0]["model_mpg_hwy"];
                var mixed = result[0]["model_mpg_mixed"];
                var city = result[0]["model_mpg_city"];
                var html = $(target).html();
                if (html === "") {
                    if (mixed !== null) {
                        $(target).html(mixed + " mpg");
                        return 1;
                    }
                    if (hwy !== null) {
                        $(target).html(hwy + " mpg");
                        return 1;
                    }
                    if (city !== null) {
                        $(target).html(city + " mpg");
                        return 1;
                    }
                }
            }
        }
    );
}