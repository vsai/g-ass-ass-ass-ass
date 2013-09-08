var carQueryHandler = function() {
    this.base_url = "http://www.carqueryapi.com/api/0.3/" + "?callback=?";

    this.callback = null;
    this.models = [];
    this.trims = null;
    this.dflt = 23.5;

    this.getAllMakes = function(callbackMethod) {
        $.getJSON(this.base_url, {cmd: 'getMakes'}, callbackMethod);
    }.bind(this);

    this.getAllModels = function(callbackMethod, makeName) {
        $.getJSON(this.base_url, {cmd: 'getModels', make: makeName}, callbackMethod);
    }.bind(this);

    this.getAllTrims = function(callbackMethod, makeId, modelName) {
        $.getJSON(this.base_url, {cmd: 'getTrims', make: makeId, model: modelName}, callbackMethod);
    }.bind(this);

    this.getCarFacts = function(callbackMethod, modelId) {
        $.getJSON(this.base_url, {cmd: 'getModel', model: modelId}, callbackMethod);
    }.bind(this);

    this.getCarFactsSimplified = function(callbackMethod, makeName, modelName, yearIn) {
        var base = this.base_url;
        $.getJSON(base,
                  {cmd: 'getTrims', make: makeName, model: modelName, year: yearIn},
                  this.parseTrims);
        this.callback = callbackMethod;
        console.log(this.callback);
    }.bind(this);

    this.parseTrims = function(data){
        var base = this.base_url;
        this.trims = data['Trims'];
        console.log(this.trims);
        if(this.trims.length == 0) {
            this.callback(this.dflt); 
        }
        var modelId = this.trims.pop()['model_id'];
        console.log(modelId);
        $.ajax({
            url: base,
            data: {cmd: 'getModel', model: modelId},
            type: "GET",
            dataType: 'json',
            success: this.getModels
       }); 
    }.bind(this);

    this.getModels = function(data){
        console.log(data);
        var city = data[0]["model_mpg_city"];
        var hwy = data[0]["model_mpg_hwy"];
        var mixed = data[0]["model_mpg_mixed"];

        console.log(city);
        console.log(hwy);
        console.log(mixed);

        result = mixed || hwy || city;
        if(result != undefined) { 
            this.callback(result);
        } else if (this.trims.length == 0) {
            this.callback(this.dflt);
        }
        else{
            var modelId = this.trims.pop()['model_id'];
            console.log(modelId);
           // var base = this.base_url;
            $.ajax({
               url: this.base_url,
               data: {cmd: 'getModel', model: modelId},
               type: "GET",
               dataType: 'json',
               success: this.getModels
            });  
        }
   }.bind(this);  
};
