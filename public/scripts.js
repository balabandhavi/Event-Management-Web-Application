document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');

    // Handle form submission for creating a new event
    if (eventForm) {
        eventForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission behavior

            // Gather form data
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const location = document.getElementById('location').value;

            // Send a POST request to the server to create a new event
            fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, date, location }), // Convert form data to JSON
            })
            .then(response => response.json())
            .then(data => {
                // Show a success message or redirect to the events page
                alert('Event created successfully!');
                window.location.href = 'events.html'; // Redirect to the events page
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to create event. Please try again.');
            });
        });
    }

    // Handle displaying the list of events on the events page
    const eventsList = document.getElementById('eventsList');

    if (eventsList) {
        // Fetch the list of events from the server
        fetch('/api/events')
            .then(response => response.json())
            .then(events => {
                // Clear the existing events list (if any)
                eventsList.innerHTML = '';

                // Display each event in the list
                events.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = 'event';
                    eventDiv.innerHTML = `
                        <strong>${event.name}</strong><br>
                        Date: ${event.date}<br>
                        Location: ${event.location}<br>
                        Created At: ${new Date(event.created_at).toLocaleString()}
                    `;
                    eventsList.appendChild(eventDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                eventsList.innerHTML = '<p>Failed to load events. Please try again later.</p>';
            });
    }
});
