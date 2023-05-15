
// CODE WITH SOME HELP FOR CHATGPT
var currentLocation; // Declare currentLocation globally
var userMarker; // Declare userMarker globally

// Declare an array to store the grocery store names
var storeNames = [];

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

    // Create a button element
    var buttontest = document.createElement('button');
    buttontest.innerHTML = 'Save Store';


    // Add a click event listener to the button
    buttontest.addEventListener('click', function() {
      storeNames.push(place.name); // Store the grocery store name in the array
      console.log(storeNames); // Display the array in the console (you can modify this part as needed)
    });

    // Create a container element for the button
    var buttonContainer = document.createElement('div');
    buttonContainer.appendChild(buttontest);

    // Format the distance in meters or kilometers
    var formattedDistance = distance < 1000 ? distance.toFixed(0) + ' meters' : (distance / 1000).toFixed(2) + ' kilometers';

        // Generate a random discount type for the store
        var discountTypes = ['Student Discounts', 'Vegetable Discounts', 'Special Offers'];
        var randomDiscountType = discountTypes[Math.floor(Math.random() * discountTypes.length)];
    
        // Generate a random whole number discount between 5 and 30
        var randomDiscount = Math.floor(Math.random() * 26) + 5;
    
    // Set the content of the info window
    var content = '<strong>' + place.name + '</strong><br>' + 'Distance: ' + formattedDistance + '<br>' + 'Discount: ' + randomDiscount + '% ' + randomDiscountType + "\n";
    content += buttonContainer.innerHTML; // Add the button to the info window content

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

  // The code for the ingredients
  const getArrayIngre = JSON.parse(localStorage.getItem("ingredients"));

  for (var i = 0; i < getArrayIngre.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.className = "style-ing";
    newDiv.innerHTML = getArrayIngre[i];
    document.getElementById("ingredients").appendChild(newDiv);
  }
};



