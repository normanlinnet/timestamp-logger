/* 
Main JavaScript file for handling the timestamp logging functionality.
*/

// DOM elements
const eventSelect = document.getElementById('event-select');
const eventForm = document.getElementById('event-form');
const eventTimeInput = document.getElementById('event-time');
const eventList = document.getElementById('event-list');
const manageEventsBtn = document.getElementById('manage-events-btn');

// Initialize event options and logged events
let events = JSON.parse(localStorage.getItem('events')) || [
    'Woke Up', 'Went to Bed', 'Felt Rejected', 'Experienced Stress', 'Felt Depressed'
];
let loggedEvents = JSON.parse(localStorage.getItem('loggedEvents')) || [];

/**
 * Populate the event dropdown with available events.
 */
function populateEventSelect() {
    eventSelect.innerHTML = '';
    events.forEach((event, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = event;
        eventSelect.appendChild(option);
    });
}

/**
 * Display the list of logged events.
 */
function displayLoggedEvents() {
    eventList.innerHTML = '';
    loggedEvents.forEach(log => {
        const li = document.createElement('li');
        li.textContent = `${events[log.eventIndex]} at ${new Date(log.timestamp).toLocaleString()}`;
        eventList.appendChild(li);
    });
}

/**
 * Event handler for logging a new event.
 */
eventForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get selected event index
    const eventIndex = eventSelect.value;

    // Use current time if no time is specified
    let timestamp = eventTimeInput.value ? new Date(eventTimeInput.value).getTime() : Date.now();

    // Add the new log to the loggedEvents array
    loggedEvents.push({ eventIndex, timestamp });

    // Save to localStorage
    localStorage.setItem('loggedEvents', JSON.stringify(loggedEvents));

    // Reset the form and update the display
    eventForm.reset();
    displayLoggedEvents();
});

/**
 * Navigate to the event management page.
 */
manageEventsBtn.addEventListener('click', function() {
    window.location.href = 'manage.html';
});

// Initial setup
populateEventSelect();
displayLoggedEvents();

