function initMap() {
  let mapDiv = document.getElementById('map');
  let map = new google.maps.Map(mapDiv, {
    zoom: 12,
    center: new google.maps.LatLng(43.6532, -79.3832)
  });

  // We add a DOM event here to show an alert if the DIV containing the
  // map is clicked.
  google.maps.event.addListener(mapDiv, 'click', function(event) {
    window.alert('Map was clicked!');
    console.log(event.latlng)
  });
}

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
