function initMap () {
  var mapOptions = {
    center: new google.maps.LatLng(43.65432, -79.38347),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  google.maps.event.addListener(map, 'click', function (e) {
    var location = e.latLng;
    console.log(location.lat());
    console.log(location.lng());

    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
   
    google.maps.event.addListener(marker, "click", function (e) {
      var infoWindow = new google.maps.InfoWindow({
        content:
          '<form class="create-point">' +
          '<input name="latitude" type="hidden" value="' + location.lat() + '" />' +
          '<input name="longitude" type="hidden" value="' + location.lng() + '" />' +
          '<p>Title</p>' +
          '<input id="title" type="text" name="title" placeholder="title">' +
          '<p>Description</p>' +
          '<input id="description" type="text" name="description" placeholder="description"> <br> <br>' +
          '<button type ="submit" >Update</button>' +
          '</form>'
      });

      infoWindow.open(map, marker);

      google.maps.event.addListener(infoWindow, 'domready', function () {

        $(".create-point").on("submit", function (ev) {
          ev.preventDefault();
          var pointData = $(this).serializeArray();
          console.log(pointData);
          var singlePoint = {
                              latitude:parseFloat(pointData[0].value),
                              longitude:parseFloat(pointData[1].value),
                              title:pointData[2].value,
                              description:pointData[3].value
                            };
          console.log(singlePoint);  
          pointsArray.push(singlePoint);                  
          infoWindow.close();
         });

      });
    });
  });
};

var pointsArray = [];
var map;

$(document).ready(function () {

  $(".map-info").on("submit", function (ev) {
    ev.preventDefault(); 

    var mapinfo = $(this).serializeArray();
    console.log(mapinfo);
    var latitude = map.getCenter().lat();
    var longitude = map.getCenter().lng();
    var zoomValue = map.getZoom();
    var mapdata = {mapname:mapinfo[0].value,
                  lat:latitude, 
                  lng: longitude, 
                  zoom: zoomValue};
    console.log(mapdata);  
   

    $.ajax({
        url: "/maps", 
        method: "POST",
        data: mapdata
      }).then(function (response) {
        console.log("after POST to /maps", response);
        if(response.id){
          pointsArray.forEach(function (point) {
              var map_id = response.id;
              console.log("Ajax for point: "+map_id);
              createPoint(point,map_id);
            });
            // redirect to the new map page
           window.location.replace(`/maps/${response.id}`);
        }
        
      }).catch(function (error) {
        console.log("Error:", error);
      })
   
   });

})

function createPoint(point,map_id) {
  $.ajax({
    url: "/points", 
    method: "POST",
    data:{'title':point.title,
    'description':point.description,
    'latitude':point.latitude,
    'longitude':point.longitude,
    'map_id':map_id}
  }).then(function () {
    console.log("one point created")
    // should see the map ID
  }).catch(function (error) {
    console.log("Error:", error);
  })
}
