function initMap () { //will give the blank map
  var mapOptions = {
    center: new google.maps.LatLng(43.65432, -79.38347),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

var map;

$(document).ready(function () {
 
  var url = window.location.pathname; //gives the current URL
  var id = url.substring(url.lastIndexOf('/') + 1); //gives the mapID
  $.ajax({
    url: "/maps/data/"+ id,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    if(response.pointsArray){
      map.setCenter({lat:response.map_latitude, lng:response.map_longitude});
      map.setZoom(response.map_zoomlevel);
      loadMapData(response);
    }
    
  }).catch(function (error) {
    console.log("Error:", error);
  })

  $(".fav-button").on("click", function (ev) {
    ev.preventDefault(); 
    $.ajax({
      url: "/addfavorites",
      method: "POST",
      data: {map_id: $(this).data("map-id"), map_name:$('.map-name').val()}
    }).then(function (response) {
      console.log("fav success")
      alert("Maps added to favorites");
      //window.location.replace("/") //redirects to root page,once we click fav. redirect to UserPage
    }).catch(function (error) {
      console.log("Error:", error);
    })
  });

})

function loadMapData(response){
  $('.map-name').text("Map Name: "+response.map_name); //render the mapName
    var marker;
    var i;
    //https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example

    for (i = 0; i < response.pointsArray.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(response.pointsArray[i].latitude, response.pointsArray[i].longitude),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var infowindow = new google.maps.InfoWindow();
          infowindow.setContent(
          "<p>Title: " + response.pointsArray[i].title + "</p>"
                              + "<p>Description: " + response.pointsArray[i].description + "</p>")
                              // + "<p>Co-ordinates" + response.pointsArray[i].latitude + "</p>")
                              // "Co-ordinates: " + response.pointsArray[i].latitude)
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}
