
// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('content'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}

//Module to get device location
var userLocation  = document.getElementById('location');
    
function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        userLocation.innerHTML = 'Geolocation is not supported by this browser.'
    }
}
    
function showPosition(position) {
    userLocation.innerHTML = "Latitude: " +position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    }
    
//Trying the ticketmaster api
var apikey = 'RFICjUjeerutWCLOjlYKQaGawIvVOZ6R';