
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
        console.log("Geolocation is not supported by this browser.");
    }
}
getLocation();
    
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    var lat = position.coords.latitude;
    var long = position.coords.latitude;
    }
    
//Trying the ticketmaster api
var apikey = 'RFICjUjeerutWCLOjlYKQaGawIvVOZ6R';

//Script for options popover
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