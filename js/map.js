let Latitude = undefined;
let Longitude = undefined;

// Get geo coordinates
function getMapLocation() {
  if (document.querySelector("#map")) {
    navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
  }
}

// Success callback for get geo coordinates
var onMapSuccess = (position) => {
  Latitude = document.querySelector("#map").getAttribute('latitude') || position.coords.latitude;
  Longitude = document.querySelector("#map").getAttribute('longitude') || position.coords.longitude;

  window.localStorage.setItem('latitude', Latitude);
  window.localStorage.setItem('longitude', Longitude);

  getMap(Latitude, Longitude);
}

// Get map by using coordinates
function getMap(latitude, longitude) {
  const mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 1,
    gestureHandling: 'greedy',
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.querySelector("#map"), mapOptions);

  const latLong = new google.maps.LatLng(latitude, longitude);

  const marker = new google.maps.Marker({
    position: latLong
  });

  marker.setMap(map);
  map.setZoom(15);
  map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position
const onMapWatchSuccess = (position) => {
  const updatedLatitude = position.coords.latitude;
  const updatedLongitude = position.coords.longitude;

  if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
    Latitude = document.querySelector("#map").getAttribute('latitude') || updatedLatitude;
    Longitude = document.querySelector("#map").getAttribute('longitude') || updatedLongitude;

    window.localStorage.setItem('latitude', Latitude);
    window.localStorage.setItem('longitude', Longitude);

    getMap(Latitude, Longitude);
  }
}

// Error callback
function onMapError(error) {
  console.log(`code: ${error.code}\nmessage: ${error.message}\n`);
}

// Watch your changing position
function watchMapPosition() {
  if (document.querySelector("#map")) {
    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
  }
}