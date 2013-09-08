var myGasFeedHandler = function() {
    // Provide a latitude, longitude, and callback which takes in the gas price.
    this.getNearAverageGasPrice = function(lat, lon, callback) {
        var radius = 10; // (miles)
        var fuelTypes = ['reg', 'mid', 'pre', 'diesel'];
        var sortBy = ['price', 'distance'];
        var apikey = 'rfej9napna';
        var baseUrl = 'http://devapi.mygasfeed.com/';
        var query = 'stations/' + 
                    'radius/' +
                    lat + '/' +
                    lon + '/' +
                    radius + '/' +
                    fuelTypes[2]+ '/' +
                    sortBy[0]+ '/' +
                    apikey + '.json';

        $.getJSON(baseUrl+query, 
                  function(data){
                    callback(this.extractGasPrice(data));
                  }.bind(this));
    }.bind(this);

    this.extractGasPrice = function(data){
        if (!data || !data['stations']) {return 3.56; }
        var stationPrices = data['stations'].map(function(station){
                                                 return station['price']});

        stationPrices = stationPrices.filter(function(elem){ return (elem != 'N/A'); });

        var total = stationPrices.reduce(
                        function(previousPrice, currentPrice, index, stations){
                            return parseFloat(previousPrice) + parseFloat(currentPrice);
                        }, 0); 

        var avg = total/stationPrices.length;
        return avg;
    }.bind(this);
};
