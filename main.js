// Initialize and add the map
let map;

async function initMap() {
  // The location of New York City
  const position = { lat: 40.71992149783236, lng: -74.03880759381295 };

  // Request the necessary libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  // const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at New York City
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    disableDefaultUI: true,
    draggable: false,
    mapId: "Discover Map",
  });

  new google.maps.Marker({
    position: position,
    map,
    title: "Default Location",
  });
}

initMap();
