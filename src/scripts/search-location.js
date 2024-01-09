const input = document.getElementById('location-input');

function initAutocomplete() {
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

    // Load saved location state from local storage
    const savedLocation = localStorage.getItem('location');
    const locationSet = localStorage.getItem('isLocationSet') === 'true';

    if (savedLocation && locationSet) {
        const locationObj = JSON.parse(savedLocation);
        updateMapLocation({ geometry: { location: new google.maps.LatLng(locationObj) } });
    }
}

function updateMapLocation(place) {
    if (!place.geometry || !place.geometry.location) {

        isLocationSet = false;
        localStorage.removeItem('location');
        localStorage.setItem('isLocationSet', false);

        window.alert("No details available for input: '" + place.name + "'");
        return;
    }  
    
    // Set the center of the map to the place's location
    map.setCenter(place.geometry.location);

    marker.setPosition(place.geometry.location);
    marker.setTitle("Home Town");

    isLocationSet = true;

    localStorage.setItem('location', JSON.stringify(place.geometry.location.toJSON()));
    localStorage.setItem('isLocationSet', true);
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

                    // Get city from coordinates and update input field
                    getCityFromCoordinates(userPos.lat, userPos.lng);

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

function getCityFromCoordinates(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                const addressComponents = results[0].address_components;
                const cityComponent = addressComponents.find(component => component.types.includes('locality'));
                const countryComponent = addressComponents.find(component => component.types.includes('country'));

                let locationString = '';
                if (cityComponent) {
                    locationString += cityComponent.long_name;
                }
                if (countryComponent) {
                    locationString += (locationString ? ', ' : '') + countryComponent.long_name;
                }

                input.value = locationString;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}


initAutocomplete();
geolocation();