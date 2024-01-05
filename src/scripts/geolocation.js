function geolocation() {
    const locationButton = document.getElementById('current-location-btn');
    const geoError = document.getElementById('geo-error');

    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos);
                },
                () => {
                    geoError.style.display = 'block';
                    geoError.textContent = 'Error: The Geolocation service failed.';
                }
            );
        } else {
            // Browser doesn't support Geolocation
            geoError.style.display = 'block';
            geoError.textContent = 'Error: Geolocation is not supported by this browser.';
        }
    });
}

geolocation();

