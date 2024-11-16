document.getElementById("event-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const startField = document.getElementById("start-datetime");
    const endField = document.getElementById("end-datetime");
    const allDayCheckbox = document.getElementById("all-day-checkbox");

    const start = new Date(startField.value);
    const end = new Date(endField.value);

    // Validate start and end times
    if (!allDayCheckbox.checked && end <= start) {
        alert("End datetime must be after start datetime.");
        return;
    }

    // Handle all-day event logic
    if (allDayCheckbox.checked) {
        const startDate = start.toISOString().slice(0, 10);
        startField.value = `${startDate}T00:00`;
        endField.value = `${startDate}T23:59`;
    }

    // Send data to the backend
    const eventData = {
        startDatetime: startField.value,
        endDatetime: endField.value,
        isAllDay: allDayCheckbox.checked,
        isRecurring: document.getElementById("is-recurring").checked,
    };

    fetch("/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert("Event saved successfully!");
            }
        })
        .catch((error) => console.error("Error:", error));
});
