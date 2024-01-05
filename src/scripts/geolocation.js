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

geolocation();

