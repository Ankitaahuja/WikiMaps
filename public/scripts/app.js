// Markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initMap() {
  let mapDiv = document.getElementById('map');
  let map = new google.maps.Map(mapDiv, {
    zoom: 12,
    center: new google.maps.LatLng(43.6532, -79.3832)
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      //$("<div>").html(user.name).appendTo($("body"));
    }XMLDocument
  });;
});
    // Add a marker at the center of the map.
    // addMarker(toronto, map);
  }

  // Adds a marker to the map.
  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map
    });
  }

  // google.maps.event.addDomListener(window, 'load', initialize)

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       //$("<div>").html(user.name).appendTo($("body"));
//     }
//   });;
// });
