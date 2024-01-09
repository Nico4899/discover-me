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

    // Add event listener for input changes
    input.addEventListener('input', function() {
        // Check if the input field is empty
        if (input.value.trim() === '') {
            isLocationSet = false;
        } 
    });
}

function updateMapLocation(place) {
    if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        isLocationSet = false;
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }  
    
    // Set the center of the map to the place's location
    map.setCenter(place.geometry.location);

    marker.setPosition(place.geometry.location);
    marker.setTitle("Home Town");

    isLocationSet = true;
}

function geolocation() {
    const locationButton = document.getElementById('current-location-btn');

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(userPos);

                    new google.maps.Marker({
                        position: userPos,
                        map,
                        title: "Your Location",
                    });

                    isLocationSet = true;
                },
                () => {
                    displayErrorMessage("Error: The Geolocation service failed.", locationButton.id);
                }
            );
        } else {
            // Browser doesn't support Geolocation
            displayErrorMessage("Error: Geolocation is not supported by this browser.", locationButton.id);
        }
    });
}

initAutocomplete();
geolocation();