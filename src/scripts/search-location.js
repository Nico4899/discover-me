let isLocationSet = false;
let map;
let marker;

// Initialize autocomplete for location search
function initAutocomplete() {
    const input = document.getElementById('location-input');
    const options = {
        types: ['(cities)'],
        fields: ["address_components", "geometry", "icon", "name"]
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    // Event listener for the Enter key
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submit
            const place = autocomplete.getPlace();
            if (place) {
                updateMapLocation(place);
            }
        }
    });

    // Listen for the event fired when the user selects a prediction
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        updateMapLocation(place);
    });

    // Add event listener for input changes
    input.addEventListener('input', function() {
        if (input.value.trim() === '') {
            isLocationSet = false;
            localStorage.removeItem('location');
            localStorage.setItem('isLocationSet', false);
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

// Update the map with the selected location
function updateMapLocation(place) {
    if (!place.geometry || !place.geometry.location) {
        // Handle no location
        isLocationSet = false;
        localStorage.removeItem('location');
        localStorage.setItem('isLocationSet', false);
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    // Set location and save to local storage
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setTitle("Home Town");
    isLocationSet = true;

    // Save location and state to local storage
    localStorage.setItem('location', JSON.stringify(place.geometry.location.toJSON()));
    localStorage.setItem('isLocationSet', true);
}

// Get city from coordinates and update input field
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

                document.getElementById('location-input').value = locationString;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

// Geolocation function to find user's current location
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
                    window.alert("Error: The Geolocation service failed.");
                }
            );
        } else {
            window.alert("Error: Geolocation is not supported by this browser.");
        }
    });
}


initAutocomplete();
geolocation();