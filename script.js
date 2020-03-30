var apikey = 'RFICjUjeerutWCLOjlYKQaGawIvVOZ6R';
var userPos = []
// Generate options popover
let currentPopover = null;
console.log([4])

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
var currentLat;
var currentLong;
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
            currentLat = pos.lat
            currentLong = pos.lng
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);
            userPos.push(pos)
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    console.log(userPos);
}

$('#searchbar').keypress(function(){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13'){
        initMap();
        $(".resultsList").empty();
var eventQuery = $("#searchbar").val();
var URLQuery = "&classificationName=" + eventQuery + "&keyword=" + eventQuery;
// Function to place event location markers on map
function setMarkers(map) {
    for (var i = 0; i < eventMarkers.length; i++) {
        var eventMarker = eventMarkers[i];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(eventMarker.lat, eventMarker.lng),
            type: 'info',
            map: map,
            title: eventMarker.title,
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

// Ticketmaster api url
var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=qLlPf15a4A5NkJubrNvhwL0EJsCeb40H&locale=*&countryCode=AU&stateCode=WA" + URLQuery + "&size=20&latlng=-" + userPos.lat + userPos.lng + "&radius=10&unit=km"
console.log(queryURL);
// Array to hold event coordinates
var eventMarkers = [];
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
        // Object that contains location information of events
        var marker = {
            lat: eventLat,
            lng: eventLng,
            title: eventName,
            venue: eventVenue
        }
        eventMarkers.push(marker);

        //creating an event list
        var slidingItem = $("<ion-item-sliding>");
        var eventListBtn = $("<ion-item>");
        eventListBtn.prop("button", true);
        eventListBtn.attr("id", "event" + [i]);
        eventListBtn.val(events[i]);

        var titleId = $("<ion-label>").text(eventName);
        var itemOptions = $("<ion-item-options>");

        slidingItem.append(eventListBtn);
        eventListBtn.append(titleId);
        slidingItem.append(itemOptions);

        $(".resultsList").append(slidingItem);

        $("#event" + [i]).on("click", function() {

            console.log("click")

            $("#more-information").empty();

            //grabs value
            var indexVal = $(this).val();
            console.log(indexVal)
    
            //event information
            var eventName = indexVal.name;
            var eventVenue = indexVal._embedded.venues[0].name;
            var eventImageUrl = indexVal.images[0].url;
            var eventDates = indexVal.dates.start.localDate;
            //var eventTime = indexVal.dates.start.localTime;
            var eventCategory = indexVal.classifications[0].segment.name;
            var eventTicketStatus = indexVal.dates.status.code;
            var eventURL = indexVal.url;
            var eventDescription = indexVal.info;
             if (eventDescription === undefined){
                 eventDescription = "No details available";
             }
            //var eventLink = events[i].url;
            
            //creating more information container
            var containerIn = $("<ion-card>");
            var titleIn = $("<ion-card-title>").text(eventName);
            var venueIn = $("<ion-card-subtitle>").text("Venue: " + eventVenue);
            var categoryIn = $("<ion-card-subtitle>").text("Category: " + eventCategory);
            var datesIn = $("<ion-card-subtitle>").text("Date: " + eventDates);
            var statusIn = $("<ion-card-subtitle>").text("Status: " + eventTicketStatus);
            var tickets = $("<ion-button>").attr("href", eventURL).text("Purchase Tickets");
            var description = $("<ion-card-content>").text(eventDescription);
            //event image
            var imgIn = $("<img>").attr("src", eventImageUrl);
            imgIn.width("200px");

            containerIn.append(titleIn)
            containerIn.append(imgIn);
            containerIn.append(venueIn);
            containerIn.append(categoryIn);
            containerIn.append(datesIn);
            containerIn.append(statusIn);
            containerIn.append(description);
            containerIn.append(tickets);
            

            $("#more-information").append(containerIn);
            
        })
        
        //console logging information, to check if working
        //console.log(eventName);
        //console.log(eventVenue);
        //console.log(eventLng);
        //console.log(eventLat);
        //console.log(eventImageUrl);
        //console.log(eventDates);
        //console.log(eventTime);
        //console.log(eventCategory);
        //console.log(eventTicketStatus);
        //console.log("_______________________________________");

    }
    setMarkers(map);
    
    $("#searchbar").val("");

});
    }
});
