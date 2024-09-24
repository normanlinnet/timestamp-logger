/* 
Main JavaScript file for handling the timestamp logging functionality,
updated to remove the real-time date and time display and allow manual input.
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
    li.innerHTML = `${events[log.eventIndex]}<br>${new Date(
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

  // Set the event time input to the existing timestamp
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

  // Check if the event time input is specified
  let timestamp;
  if (eventTimeInput.value) {
    timestamp = new Date(eventTimeInput.value).getTime();
  } else {
    timestamp = Date.now(); // Use current timestamp if no time is specified
  }

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

// Initial setup
populateEventSelect();
displayLoggedEvents();
