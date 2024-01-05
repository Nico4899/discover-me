/*
let autocomplete; 

function initAutocomplete() {
    const input = document.getElementById('location-input');
    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'], // You can change this to 'geocode' for addresses
    });

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
        // User entered the name of a place that was not suggested and pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
    } else {
        // Process the details for the selected place.
        console.log('Place details:', place);
    }
}

document.getElementById('location-input').addEventListener('input', function(e) {
    // Call the Google Places API on each input
    // The autocomplete functionality will handle the API calls and suggestions
});

// Initialize the autocomplete functionality
google.maps.event.addDomListener(window, 'load', initAutocomplete);
*/