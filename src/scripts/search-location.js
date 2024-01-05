function initAutocomplete() {

    const input = document.getElementById('location-input');
    const options = {
        types: ['(cities)'],
        fields: ["address_components", "geometry", "icon", "name"]
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    if (!window.map) {
        console.error("Map is not initialized.");
        return;
    }

    // Event listener for the Enter key
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submit

            if (autocomplete.getPlace()) {
                // If a place is already selected, use it
                updateMapLocation(autocomplete.getPlace());
            }
        }
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        updateMapLocation(place);
    });
}

function updateMapLocation(place) {
    if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }  
    
    // Set the center of the map to the place's location
    map.setCenter(place.geometry.location);

    marker.setPosition(place.geometry.location);
    marker.setTitle("Home Town");

    isLocationSet = true;
}

initAutocomplete();