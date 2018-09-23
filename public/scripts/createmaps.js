function initMap () {
  var mapOptions = {
    center: new google.maps.LatLng(43.65432, -79.38347),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  google.maps.event.addListener(map, 'click', function (mapPoint) { //point where user will click
    var location = mapPoint.latLng;
    console.log(location.lat());
    console.log(location.lng());

    var marker = new google.maps.Marker({ //red marker when the user clicks on the point on map
      position: location,
      map: map
    });

    google.maps.event.addListener(marker, "click", function (e) {
      var infoWindow = new google.maps.InfoWindow({
        content:
          '<form class="create-point" action="/fileupload" enctype="multipart/form-data" method="post">' +
          '<input name="latitude" type="hidden" value="' + location.lat() + '" />' +
          '<input name="longitude" type="hidden" value="' + location.lng() + '" />' +
          '<p>Title</p>' +
          '<input id="title" type="text" name="title" placeholder="title">' +
          '<p>Description</p>' +
          '<input id="description" type="text" name="description" placeholder="description"> <br> <br>' +
          '<input id="image" type="file" name="image"> <br><br>' +
          '<button type ="submit" >Update</button>' +
          '</form>'
      });

      infoWindow.open(map, marker);

      google.maps.event.addListener(infoWindow, 'domready', function () {

        $(".create-point").on("submit", function (ev) {
          ev.preventDefault();

          var formData = $(this).serializeArray();
          console.log(formData);

          console.log(currentMapId);

          if(currentMapId === undefined){
            console.log("Called createMap");
            createMap();
          }

          var form = ev.target;
          var data = new FormData(form);
          $.ajax({
            url: form.action,
            method: form.method,
            processData: false,
            contentType: false,
            data: data,
            processData: false,
            success: function(data){

              console.log(data)
              console.log(data.url)
              var singlePoint = {
                latitude : parseFloat(formData[0].value),
                longitude : parseFloat(formData[1].value),
                title : formData[2].value,
                description : formData[3].value,
                url:data.url
              };
              console.log(singlePoint);
              pointsArray.push(singlePoint);  // the Array of point objects

            },
            error:function(err){
              var singlePoint = {
                latitude : parseFloat(formData[0].value),
                longitude : parseFloat(formData[1].value),
                title : formData[2].value,
                description : formData[3].value,
                url:'null'
              };
              console.log(singlePoint);
              pointsArray.push(singlePoint); 
            }
          })

          infoWindow.close();
         });

      });
    });
  });
};

var pointsArray = [];
var map;
var currentMapId;

$(document).ready(function () {
 
  /*
  $(".map-info").on("submit", function (ev) {
    ev.preventDefault();

    var mapinfo = $(this).serializeArray(); //mapinfo from mapform gives only the name of map
    console.log(mapinfo);
    var latitude = map.getCenter().lat(); //comes from google map
    var longitude = map.getCenter().lng();
    var zoomValue = map.getZoom();
    var mapdata = {mapname: mapinfo[0].value,
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
        if(response.id){ //response.id is the map-ID returned by server
          pointsArray.forEach(function (point) {
              var map_id = response.id;
              console.log("Ajax for point: "+ map_id);
              createPoint(point,map_id); //sending each point info and map_id; function is declared below
            });
            // redirect to the new map page
           window.location.replace(`/maps/${response.id}`);
        }

      }).catch(function (error) {
        console.log("Error:", error);
      })

   });

   */

   $(".map-info").on("submit", function (ev) {
    ev.preventDefault();

    pointsArray.forEach(function (point) {
      var map_id = currentMapId;
      console.log("Ajax for point: "+ map_id);
      createPoint(point,map_id); //sending each point info and map_id; function is declared below
    });
    // redirect to the new map page
   window.location.replace(`/maps/${currentMapId}`);
  

   });

})

function createMap() {

  var mapnamevalue = $("#mapname").val();
  console.log('mapnamevalue: '+mapnamevalue);
    var latitude = map.getCenter().lat(); //comes from google map
    var longitude = map.getCenter().lng();
    var zoomValue = map.getZoom();
    var mapdata = {mapname: mapnamevalue,
                  lat:latitude,
                  lng: longitude,
                  zoom: zoomValue};

  $.ajax({
    url: "/maps",
    method: "POST",
    data:mapdata
  }).then(function (response) {
    if(response.id){ //response.id is the map-ID returned by server
      console.log("one point created");
      currentMapId = response.id;
    }
  
  }).catch(function (error) {
    console.log("Error:", error);
  })
}


function createPoint(point,map_id) {
  $.ajax({
    url: "/points",
    method: "POST",
    data:{'title':point.title,
    'description':point.description,
    'latitude':point.latitude,
    'longitude':point.longitude,
    'url':point.url,
    'map_id':map_id}
  }).then(function () {
    console.log("one point created")
    // should see the map ID
  }).catch(function (error) {
    console.log("Error:", error);
  })
}
