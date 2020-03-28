var apikey = 'RFICjUjeerutWCLOjlYKQaGawIvVOZ6R';
var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=qLlPf15a4A5NkJubrNvhwL0EJsCeb40H&locale=*&countryCode=AU&city=Perth&radius=100&unit=km"
// Generate options popover
let currentPopover = null;

const buttons = document.querySelectorAll('ion-button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick);
}

async function handleButtonClick(ev) {
    popover = await popoverController.create({
        component: 'options-popover',
        event: ev,
        translucent: true
    });
    currentPopover = popover;
    return popover.present();
}

function dismissPopover() {
    if (currentPopover) {
        currentPopover.dismiss().then(() => { currentPopover = null; });
    }
}

customElements.define('options-popover', class ModalContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-list>
        <!--List of checkbox options-->
        <ion-item>
            <ion-label>Concerts</ion-label>
            <ion-checkbox slot="end" value="Concerts"></ion-checkbox>
        </ion-item>

        <ion-item>
            <ion-label>Sports</ion-label>
            <ion-checkbox slot="end" value="Sports"></ion-checkbox>
        </ion-item>
        
        <ion-item>
            <ion-label>Social</ion-label>
            <ion-checkbox slot="end" value="Social"></ion-checkbox>
        </ion-item>

        <ion-item>
            <ion-label>Cultural</ion-label>
            <ion-checkbox slot="end" value="Concerts"></ion-checkbox>
        </ion-item>

        <ion-item>
            <ion-label>Food</ion-label>
            <ion-checkbox slot="end" value="Sports"></ion-checkbox>
        </ion-item>

        <ion-item>
            <ion-label>Other</ion-label>
            <ion-checkbox slot="end" value="Social"></ion-checkbox>
        </ion-item>
    </ion-list>
        `;
    }
});
// Initialize and add the map
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('content'), {
        center: { lat: -32.000, lng: 115.800 },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    setMarkers(map);
}

console.log(eventMarkers);
// Function to place event location markers on map
function setMarkers(map) {
    for (var i = 0; i < eventMarkers.length; i++) {
        var eventMarker = eventMarkers[i];
        var marker = new google.maps.Marker({
                position: new google.maps.LatLng(eventMarker.lat, eventMarker.lng),
                type: 'info',
            map: map,
            title: eventMarker.title
        });
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


// Trying the ticketmaster api

// Array to hold event coordinates
var eventMarkers = [
];
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    var events = response._embedded.events;
    console.log(response);
    for (var i = 0; i < events.length; i++) {
        var eventName = events[i].name;
        var eventVenue = events[i]._embedded.venues[0].name;
        var eventLng = events[i]._embedded.venues[0].location.longitude;
        var eventLat = events[i]._embedded.venues[0].location.latitude;
        if (eventLng === undefined || eventLat === undefined) {
            return;
        }
        var marker = {
            lat: eventLat,
            lng: eventLng,
            title: eventName

        }

        eventMarkers.push(marker);
        console.log(eventName);
        console.log(eventVenue);
        console.log(eventLng);
        console.log(eventLat);
        console.log("_______________________________________");
    }
setMarkers(map);
    eventList();

    //create button list function
    function eventList() {

        //for (let i = 0; i < event.length; i++) {
        //    const element = event[i];

        var slidingItem = $("<ion-item-sliding>")

        var eventListBtn = $("<ion-item>")
        eventListBtn.prop("button", true)

        var tittleId = $("<ion-label>").text("tittle")

        var itemOptions = $("<ion-item-options>")

        slidingItem.append(eventListBtn)
        eventListBtn.append(tittleId)
        slidingItem.append(itemOptions)


        $(".resultsList").append(slidingItem)
    }

})
