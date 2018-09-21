function initMap () {
  var mapOptions = {
    center: new google.maps.LatLng(43.65432, -79.38347),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

var map;

$(document).ready(function () {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  $.ajax({
    url: "/maps/data/"+id, 
    method: "GET"
  }).then(function (response) {

    console.log(response); 
    loadMapData(response);
  
  }).catch(function (error) {
    console.log("Error:", error);
  })

})

function loadMapData(response){
  $('.map-name').text("Map Name: "+response.map_name);

    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    
    //https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example

    for (i = 0; i < response.pointsArray.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(response.pointsArray[i].latitude, response.pointsArray[i].longitude),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(response.pointsArray[i].title);//Add Description, Title and Image using HTML, see the create maps example
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}


