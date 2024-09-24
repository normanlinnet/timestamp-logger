/* 
JavaScript file for managing event types (CRUD operations).
*/

// DOM elements
const newEventForm = document.getElementById('new-event-form');
const newEventNameInput = document.getElementById('new-event-name');
const manageEventList = document.getElementById('manage-event-list');
const backBtn = document.getElementById('back-btn');

// Retrieve events from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

/**
 * Display the list of events with options to edit or delete.
 */
function displayManageEvents() {
    manageEventList.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        const eventName = document.createElement('span');
        eventName.textContent = event;

        // Create edit and delete buttons
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        // Button container
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('manage-buttons');
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(eventName);
        li.appendChild(btnContainer);
        manageEventList.appendChild(li);

        // Edit event handler
        editBtn.addEventListener('click', function() {
            const newName = prompt('Enter new name for the event:', event);
            if (newName) {
                events[index] = newName;
                localStorage.setItem('events', JSON.stringify(events));
                displayManageEvents();
            }
        });

        // Delete event handler
        deleteBtn.addEventListener('click', function() {
            if (confirm(`Are you sure you want to delete the event "${event}"?`)) {
                events.splice(index, 1);
                localStorage.setItem('events', JSON.stringify(events));
                displayManageEvents();
            }
        });
    });
}

/**
 * Event handler for adding a new event.
 */
newEventForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Add new event to the events array
    events.push(newEventNameInput.value);

    // Save to localStorage
    localStorage.setItem('events', JSON.stringify(events));

    // Reset the form and update the display
    newEventForm.reset();
    displayManageEvents();
});

/**
 * Navigate back to the main page.
 */
backBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Initial setup
displayManageEvents();

