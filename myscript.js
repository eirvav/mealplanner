// Replace 'YOUR_API_KEY' with your actual API key
var apiKey = 'AIzaSyBiDN0RujLiWcyLcxm3810TENbj8_4rf9g';

// Define the starting location and two grocery store addresses
var startAddress = '123 Main St, City, State';
var groceryStore1Address = '456 Elm St, City, State';
var groceryStore2Address = '789 Oak St, City, State';

// Create a DirectionsService object
var directionsService = new google.maps.DirectionsService();

// Calculate route from starting location to grocery store 1
var request1 = {
  origin: startAddress,
  destination: groceryStore1Address,
  travelMode: google.maps.TravelMode.DRIVING
};
directionsService.route(request1, function(result1, status1) {
  if (status1 === google.maps.DirectionsStatus.OK) {
    var route1 = result1.routes[0];
    var distance1 = route1.legs[0].distance.text;
    var duration1 = route1.legs[0].duration.text;
    var steps1 = route1.legs[0].steps;

    // Extract the end location of the first route to use as the starting location for the second route
    var endLocationRoute1 = steps1[steps1.length - 1].end_location;
    var startAddressRoute2 = endLocationRoute1.lat() + ',' + endLocationRoute1.lng();

    // Calculate route from grocery store 1 to grocery store 2
    var request2 = {
      origin: startAddressRoute2,
      destination: groceryStore2Address,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request2, function(result2, status2) {
      if (status2 === google.maps.DirectionsStatus.OK) {
        var route2 = result2.routes[0];
        var distance2 = route2.legs[0].distance.text;
        var duration2 = route2.legs[0].duration.text;
        var steps2 = route2.legs[0].steps;

        // Print the results
        console.log('Route from starting location to grocery store 1:');
        console.log('Distance: ' + distance1);
        console.log('Duration: ' + duration1);
        console.log('Steps:');
        for (var i = 0; i < steps1.length; i++) {
          console.log('Step ' + (i + 1) + ': ' + steps1[i].instructions);
        }

        console.log('\nRoute from grocery store 1 to grocery store 2:');
        console.log('Distance: ' + distance2);
        console.log('Duration: ' + duration2);
        console.log('Steps:');
        for (var j = 0; j < steps2.length; j++) {
          console.log('Step ' + (j + 1) + ': ' + steps2[j].instructions);
        }
      } else {
        console.error('Failed to calculate route from grocery store 1 to grocery store 2:', status2);
      }
    });
  } else {
    console.error('Failed to calculate route from starting location to grocery store 1:', status1);
  }
});

// MAP

      function initMap() {
        // Create a new map centered on the user's current location
        navigator.geolocation.getCurrentPosition(function (position) {
          var currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: currentLocation,
          });

          // Add a marker at the user's current location
          var marker = new google.maps.Marker({
            position: currentLocation,
            map: map,
          });
        });
      }

      function displayCalendar() {
        gapi.client
          .init({
            apiKey: "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",
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
          })
          .then(function () {
            gapi.client.calendar.events
              .list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
              })
              .then(function (response) {
                var events = response.result.items;
                var calendarDiv = document.getElementById("calendar");
                if (events.length > 0) {
                  for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = new Date(event.start.dateTime);
                    var dateString =
                      when.toLocaleDateString() +
                      " " +
                      when.toLocaleTimeString();
                    var eventDiv = document.createElement("div");
                    eventDiv.innerHTML =
                      event.summary + " (" + dateString + ")";
                    calendarDiv.appendChild(eventDiv);
                  }
                } else {
                  calendarDiv.innerHTML = "No upcoming events.";
                }
              });
          });
      }