var gmapsHandler = function(page) {
    this.getDistance = function(address1, address2) {
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: address1,
            destination: address2,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var meters = response.routes[0].legs[0].distance.value;
                var miles = meters / 1609.34;
            }
        });
    }.bind(this);
};

