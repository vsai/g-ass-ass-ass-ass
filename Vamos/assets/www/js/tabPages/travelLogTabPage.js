var travelLogTabPage = function(page){
    this.page = page;
    this.mostRecentCity = "";
    this.mostRecentState = "";
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
                    //console.log(city + ", " + state);
                    //only report if we got Good Stuff
                    if (this.mostRecentCity === "" || this.mostRecentState === "") {
                        this.mostRecentCity = city;
                        this.mostRecentState = state;
                    }
                    else {
                        if(city !== this.mostRecentCity || state !== this.mostRecentState) {
                            //PUSH THE OLD CITY INFO
                            // console.log(this.mostRecentCity + ", " + this.mostRecentState);
                            // console.log(this.distanceTravelledInCity);
                            this.distanceTravelledInCity = 0;
                            this.mostRecentCity = city;
                            this.mostRecentState = state;
                        }
                    }
                    $(".currentCity").html("Current City: " + this.mostRecentCity + ", " + this.mostRecentState);
                } 
                else {
                    console.log('No results found: ' + status);
                }
            }.bind(this));
        }
    },
    
    increaseCityMileage: function(incr) {
        this.distanceTravelledInCity += incr;
    }
}