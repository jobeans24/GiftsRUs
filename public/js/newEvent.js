// create code to handle the newEvent form submission
const newEventFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#event-name").value.trim();
    const date = document.querySelector("#event-date").value.trim();
    const description = document.querySelector("#event-description").value.trim();
    const location = document.querySelector("#event-location").value.trim(); // Add input for event location

    if (name && date && description && location) {
        // Get precise location using Geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const preciseLocation = { latitude, longitude };

            const response = await fetch(`/api/events`, {
                method: "POST",
                body: JSON.stringify({ name, date, description, location, preciseLocation }), // Include preciseLocation in the request body
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Failed to create event");
            }
        }, (error) => {
            console.error(error);
            alert("Failed to get precise location");
        });
    }
};

document
    .querySelector("#newEvent-form")
  .addEventListener("submit", newEventFormHandler);