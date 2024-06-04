const editEvent = () => {
    // Get the id from the URL
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    // Get the event data
    fetch(`/api/events/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((event) => {
        // Populate the form with the existing event data
        document.querySelector("#event-name").value = event.name;
        document.querySelector("#event-date").value = event.date;
        document.querySelector("#event-location").value = event.location;
        document.querySelector("#event-description").value = event.description;
        })
        .catch((err) => console.error(err));
    
    // Update the event
    const updateEvent = async (event) => {
        event.preventDefault();
        // Get the form data
        const name = document.querySelector("#event-name").value.trim();
        const date = document.querySelector("#event-date").value.trim();
        const location = document.querySelector("#event-location").value.trim();
        const description = document.querySelector("#event-description").value.trim();
        // Update the event
        fetch(`/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, date, location, description }),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (response.ok) {
            document.location.replace("/dashboard");
            } else {
            alert("Failed to update event");
            }
        })
        .catch((err) => console.error(err));
    };
    
    // Add the event listener
    document.querySelector("#update-event").addEventListener("click", updateEvent);
    }
