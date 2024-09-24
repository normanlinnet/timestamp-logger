/* 
Main JavaScript file for handling the timestamp logging functionality, updated to include editing and deleting logged events, and real-time updating timestamp.
*/

// DOM elements
const eventSelect = document.getElementById("event-select");
const eventForm = document.getElementById("event-form");
const eventTimeInput = document.getElementById("event-time");
const eventList = document.getElementById("event-list");
const manageEventsBtn = document.getElementById("manage-events-btn");

// Initialize event options and logged events
let events = JSON.parse(localStorage.getItem("events")) || [];
let loggedEvents = JSON.parse(localStorage.getItem("loggedEvents")) || [];

/**
 * Populate the event dropdown with available events.
 */
function populateEventSelect() {
  eventSelect.innerHTML = "";
  events.forEach((event, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = event;
    eventSelect.appendChild(option);
  });
}

/**
 * Display the list of logged events with options to edit or delete.
 */
function displayLoggedEvents() {
  eventList.innerHTML = "";
  loggedEvents.forEach((log, index) => {
    const li = document.createElement("li");
    li.textContent = `${events[log.eventIndex]} at ${new Date(
      log.timestamp
    ).toLocaleString()}`;

    // Create edit and delete buttons
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Button container
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("event-buttons");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(btnContainer);
    eventList.appendChild(li);

    // Edit event handler
    editBtn.addEventListener("click", function () {
      editLoggedEvent(index);
    });

    // Delete event handler
    deleteBtn.addEventListener("click", function () {
      deleteLoggedEvent(index);
    });
  });
}

/**
 * Edit a logged event.
 */
function editLoggedEvent(index) {
  const log = loggedEvents[index];

  // Pre-fill the form with existing data
  eventSelect.value = log.eventIndex;
  eventTimeInput.value = new Date(log.timestamp).toISOString().slice(0, 16);

  // Remove the old log
  loggedEvents.splice(index, 1);

  // Update localStorage
  localStorage.setItem("loggedEvents", JSON.stringify(loggedEvents));

  // Update the display
  displayLoggedEvents();
}

/**
 * Delete a logged event.
 */
function deleteLoggedEvent(index) {
  if (confirm("Are you sure you want to delete this event?")) {
    loggedEvents.splice(index, 1);
    localStorage.setItem("loggedEvents", JSON.stringify(loggedEvents));
    displayLoggedEvents();
  }
}

/**
 * Event handler for logging a new event.
 */
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get selected event index
  const eventIndex = eventSelect.value;

  // Use current time if no time is specified
  let timestamp = eventTimeInput.value
    ? new Date(eventTimeInput.value).getTime()
    : Date.now();

  // Add the new log to the loggedEvents array
  loggedEvents.push({ eventIndex, timestamp });

  // Save to localStorage
  localStorage.setItem("loggedEvents", JSON.stringify(loggedEvents));

  // Reset the form and update the display
  eventForm.reset();
  displayLoggedEvents();
});

/**
 * Navigate to the event management page.
 */
manageEventsBtn.addEventListener("click", function () {
  window.location.href = "manage.html";
});

/**
 * Update the event time input to display the current time and update in real-time.
 */
function updateEventTime() {
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  eventTimeInput.value = localISOTime;
}

// Initial setup
populateEventSelect();
displayLoggedEvents();
updateEventTime();

// Update the event time input every second
setInterval(updateEventTime, 1000);
