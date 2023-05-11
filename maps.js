
// CODE WITH SOME HELP FOR CHATGPT
var currentLocation; // Declare currentLocation globally
var userMarker; // Declare userMarker globally

function initMap() {
  // Create a new map object
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 60.385508200000004, lng: 5.332842191341591 },
    zoom: 15
  });

  // Create a PlacesService object
  var service = new google.maps.places.PlacesService(map);

  // Get the user's current position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center the map on the user's current position
      map.setCenter(currentLocation);

      // Create a marker for the user's current location
      userMarker = new google.maps.Marker({
        map: map,
        position: currentLocation,
        title: 'Your Location',
        icon: {
          url: 'https://cdn4.iconfinder.com/data/icons/proglyphs-traveling/512/Current_Location-512.png', // Use a custom marker icon
          scaledSize: new google.maps.Size(40, 40) // Set the size of the marker icon
        }
      });

      // Use the PlacesService to perform the nearby search
      var request = {
        location: currentLocation,
        radius: 5000, // Specify the search radius in meters
        type: 'grocery_or_supermarket' // Specify the place type as 'grocery_or_supermarket'
      };

      service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Loop through the results and create markers for each grocery store
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        } else {
          // Handle the error
          console.log('Nearby search request failed. Status: ' + status);
        }
      });
    }, function() {
      console.log('Error: The Geolocation service failed.');
    });
  } else {
    console.log('Error: Your browser doesn\'t support geolocation.');
  }

  // Create a marker for each place
  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/1892/1892627.png', // Use a custom marker icon for grocery stores
        scaledSize: new google.maps.Size(40, 40) // Set the size of the marker icon
      }
    });

    // Create an info window for the marker
    var infowindow = new google.maps.InfoWindow();

    // Calculate the distance between the current location and the grocery store
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      currentLocation,
      place.geometry.location
    );

    // Format the distance in meters or kilometers
    var formattedDistance = distance < 1000 ? distance.toFixed(0) + ' meters' : (distance / 1000).toFixed(2) + ' kilometers';

    // Set the content of the info window
    var content = '<strong>' + place.name + '</strong><br>' + 'Distance: ' + formattedDistance;

    // Add a click event listener to the marker
    marker.addListener('click', function() {
      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  }
}

// Call the initMap function when the page has finished loading
window.onload = function() {
  initMap();
  const getArrayIngre = JSON.parse(localStorage.getItem("ingredients"));

  for (var i = 0; i < getArrayIngre.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.className = "style-ing";
    newDiv.innerHTML = getArrayIngre[i];
    document.getElementById("ingredients").appendChild(newDiv);
  }
};



//     // Create a DirectionsService object
//   var directionsService = new google.maps.DirectionsService();

//   // Create a DirectionsRenderer object to display the route
//   var directionsRenderer = new google.maps.DirectionsRenderer();
//   directionsRenderer.setMap(map);

//   // Define the request object for the directions
//   var request = {
//     origin: 'Lars Hilles gate 30, 5008 Bergen',
//     destination: 'Marken 34, 5017 Bergen',
//     travelMode: google.maps.TravelMode.DRIVING // Specify the travel mode (DRIVING, WALKING, BICYCLING, or TRANSIT)
//   };

//   // Use the DirectionsService to get the route
//   directionsService.route(request, function(response, status) {
//     if (status === google.maps.DirectionsStatus.OK) {
//       // Display the route on the map
//       directionsRenderer.setDirections(response);
//     } else {
//       // Handle the error
//       console.log('Directions request failed. Status: ' + status);
//     }
//   });