window.onload = function () {
  const getArrayMeals = JSON.parse(localStorage.getItem("meals"));

  for (var i = 0; i < getArrayMeals.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.className = "fc-event fc-style";
    newDiv.innerHTML = getArrayMeals[i];
    document.getElementById("external-events-list").appendChild(newDiv);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    eventClick: function (info) {
      var eventObj = info.event;

      if (eventObj.url) {
        alert(
          "Clicked " +
            eventObj.title +
            ".\n" +
            "Will open " +
            eventObj.url +
            " in a new tab"
        );

        window.open(eventObj.url);

        info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
      } else {
        alert("Clicked " + eventObj.title);
      }
    },
  });

  calendar.render();
});

document.addEventListener("DOMContentLoaded", function () {
  /* initialize the external events
        -----------------------------------------------------------------*/

  var containerEl = document.getElementById("external-events-list");
  new FullCalendar.Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText.trim(),
      };
    },
  });

  //// the individual way to do it
  // var containerEl = document.getElementById('external-events-list');
  // var eventEls = Array.prototype.slice.call(
  //   containerEl.querySelectorAll('.fc-event')
  // );
  // eventEls.forEach(function(eventEl) {
  //   new FullCalendar.Draggable(eventEl, {
  //     eventData: {
  //       title: eventEl.innerText.trim(),
  //     }
  //   });
  // });

  /* initialize the calendar
        -----------------------------------------------------------------*/

  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function (arg) {
      // is the "remove after drop" checkbox checked?
      if (document.getElementById("drop-remove").checked) {
        // if so, remove the element from the "Draggable Events" list
        arg.draggedEl.parentNode.removeChild(arg.draggedEl);
      }
    },
  });
  calendar.render();
});

// REMINDERS TO START PREPERING MEALS

// Get the dropdown element
const dropdown = document.getElementById("reminderDropdown");

// Add an event listener to detect when the selection changes
dropdown.addEventListener("change", function() {
  // Get the selected value
  const selectedValue = dropdown.value;
  
  // Convert the value to a number (if needed)
  const reminderTime = parseInt(selectedValue);
  
  // Schedule the reminder using the selected value (reminderTime)
  if (reminderTime > 0) {
    scheduleReminder(reminderTime);
  }
});

// Function to schedule the reminder
function scheduleReminder(secondsBeforeEvent) {
  // Calculate the time when the reminder should trigger
  const reminderTime = new Date(Date.now() + secondsBeforeEvent * 1000);
  
  // Set up code to trigger the reminder at the specified time
  // This can involve sending notifications or performing any desired action
  // Example:
  setTimeout(function() {
    alert("Reminder: Your event is starting soon!");
  }, secondsBeforeEvent * 1000);
}

