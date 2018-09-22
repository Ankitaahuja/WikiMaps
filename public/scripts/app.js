// Markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var labelIndex = 0;

  // function initMap(latitude, longitude) {
  //   let mapDiv = document.getElementById('map');
  //   let map = new google.maps.Map(mapDiv, {
  //     zoom: 12,
  //     center: new google.maps.LatLng(latitude, longitude)
  //   });
  // //
  //   // This event listener calls addMarker() when the map is clicked.
  //   google.maps.event.addListener(map, 'click', function(event) {
  //     addMarker(event.latLng, map);
  // });

$(() => {
  $.ajax({
    method: "GET",
    url: "/mapslist"
  }).done((result) => {
    result.mapsArray.forEach(function(map) {
      let mapName = $("<li>")
        .append(
          $('<a>').attr('href', `/maps/${map.map_id}`).html(map.map_name)
        ).appendTo($("#dropdown-maps"));
    })
  });
});

// }
