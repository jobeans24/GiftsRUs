// Function to get all events and render them
async function getEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        renderEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to render events on the dashboard
function renderEvents(events) {
    const eventsContainer = document.querySelector('.events-container');
    eventsContainer.innerHTML = '';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date}</p>
            <p>${event.location}</p>
            <a href="/registry/${event.id}" class="btn btn-primary">View Registry</a>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    getEvents();
});
