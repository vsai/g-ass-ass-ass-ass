var travelLogTabPage = function(page){
    this.page = page;
    this.mostRecentCity = "";
    this.distanceTravelledInCity = 0;
}

travelLogTabPage.prototype = {
    cityFromCoords: function(coords) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(coords.lat, coords.longi);
        if (geocoder) {
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    var city = "";
                    var state = "";
                    for(var i=0, len=result.address_components.length; i<len; i++) {
                        var ac = result.address_components[i];
                        if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
                        if(ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
                    }
                    //only report if we got Good Stuff
                    if(city != '' && state != '') {
                        console.log("Hello to you out there in "+city+", "+state+"!");
                    }
                } 
                else {
                    console.log('No results found: ' + status);
                }
            });
        }
    }
}