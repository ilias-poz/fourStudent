var map;
var service;
var infowindow;
var pos;
var request;
var place;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.7589,
      lng: 32.4156
    },
    zoom: 15,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });
  infoWindow = new google.maps.InfoWindow();

  getLocation();
  // getNearByPlaces();
  // callback();
}

function getLocation() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("getLocation:" + pos.lat + "," + pos.lng);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
      })

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found');
      infoWindow.open(map);
      map.setCenter(pos);
      getNearByPlaces(pos);
    }, function() {
      console.log("calling handleLocationError(true)");
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("calling handleLocationError(false)")
    handleLocationError(false, infoWindow, map.getCenter());
  }

  infowindow = new google.maps.InfoWindow();
}

function getNearByPlaces(pos) {
  console.log("getNearByPlaces:" + pos.lat + "," + pos.lng);
  request = {
    location: pos,
    radius: 500,
    type: 'hospital'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("callback received " + results.length + " results");
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < results.length; i++) {
      console.log(JSON.stringify(results[i]));
      place = results[i];
      var mark = createMarker(results[i]);
      bounds.extend(mark.getPosition());
    }
    map.fitBounds(bounds);
  } else console.log("callback.status=" + status);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    zoom: 15,
    icon: "http://maps.google.com/mapfiles/ms/micons/red.png"
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    map.setCenter(position);
  });
  return marker;
}







// var map, infoWindow;
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -34.397, lng: 150.644},
//           zoom: 15
//         });
//         infoWindow = new google.maps.InfoWindow;

//         // Try HTML5 geolocation.
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
//       }

//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
//         infoWindow.open(map);
//       }
