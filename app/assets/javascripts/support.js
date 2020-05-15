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
      infoWindow.setContent('You are here');
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
    radius: 200,
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

    for (var i = 0; i < results.length; i++){
      place = results[i];
      request = {
        placeId: place.place_id,
        fields: ['name', 'international_phone_number', 'geometry']
      }
      service.getDetails(request, function(place, status){
        if (status == google.maps.places.PlacesServiceStatus.OK){
          var result = '';
          result += '<li class = "place-content">'
          result += '<div class = "place-name"> Name: <p class = "place-text">' + place.name + '</p></div>'
          result += '<div class = "place-phone-number"> Phone No. : <p class = "place-text">' + place.international_phone_number +'</p></div>'
          result += '<div class = "place-geo-location"> Distance: <p class = "place-text">' + getDistance(place.geometry.location, pos)+' km</p></div>'
          result += '</li>'

          $('#details-of-hospital').append(result);
        }
        else{
          var result = '<p> Nothing to Display </p>'
        }
      })
    }
  } 
  else {
    console.log("callback.status=" + status);
  }
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
    label: 'H'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    map.setCenter(position);
  });
  return marker;
}

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat());
  var dLong = rad(p2.lng - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c / 1000;
  return d.toFixed(2); // returns the distance in kmeter
};

var rad = function(x) {
  return x * Math.PI / 180;
};







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
