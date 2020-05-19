var map, infoWindow, current_pos,query;
var directionsRenderer;
var status;
function EntertainMap() {
  map = new google.maps.Map(document.getElementById('emap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
    //Dark mode
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
  infoWindow = new google.maps.InfoWindow;
  directionsRenderer =  new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      current_pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var marker = new google.maps.Marker({
        position: current_pos,
        map:map,
        icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'
      })
      infoWindow.setPosition(current_pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(current_pos);
      searchNearby(location,'restaurant')
      searchNearby(location,'bar')
      searchNearby(location,'cafe')
      searchNearby(location,'nightclub')
      searchNearby(location,'museum')
      searchNearby(location,'mall')
      searchNearby(location,'park')
      searchNearby(location,'tourist attraction')
      searchNearby(location,'concert venue')
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function searchNearby(location,query){
  var latlng = new google.maps.LatLng(location.lat,location.lng);
  var request = {
    location: latlng,
    radius: '50',
    query: query
  };
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map)
  distancematrix = new google.maps.DistanceMatrixService();
  service.textSearch(request,callBack)


}

function callBack(results,status){
  if (status==google.maps.places.PlacesServiceStatus.OK){
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place)
      createEMarker(place);
    }
  }
}

function createEMarker(place){
  var business_status;
  switch (place.business_status){
    case 'OPERATIONAL':
      business_status = '<p style="color:green">OPEN</p>'
      break;

    case 'CLOSED_TEMPORARILY':
      business_status = '<p style="color:red">CLOSED NOW</p>'
      break;

    case 'CLOSED_PERMANENTLY':
      business_status = '<p style="color:red">PERMANENTLY CLOSED</p>'
  }

  console.log(origin)


  var icon = {
    url: place.icon, // url
    scaledSize: new google.maps.Size(20, 20), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};
  var marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location,
    zoom: 15,
    icon: icon
  })
  google.maps.event.addListener(marker, 'click', function() {
    //Finding out Directions
    var origin = current_pos.lat+","+current_pos.lng
    var destination = place.formatted_address

    var directionsService = new google.maps.DirectionsService();
    var route;
    directionsRenderer.setMap(map)
    var request ={
      origin: origin,
      destination: destination,
      travelMode: google.maps.DirectionsTravelMode.WALKING
    }
    directionsService.route(request, function(result, status){
      if (status == 'OK'){
        route = result.routes[0].legs[0] //Only one route returned anyway
        directionsRenderer.setDirections(result)
        var ETA = route.duration.text
        infowindow.setContent('<div><strong>'+place.name+'</strong><br>'+place.formatted_address+'<br>'+business_status+'<br>'+'(walking) ETA: '+ETA)
      }
    })


    infowindow.open(map, this);
    map.setCenter(marker.position);

  });

}

function calculateRoute(origin,destination){


}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
