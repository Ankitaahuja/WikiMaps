var pointsArray = [
  {
      latitude: 43.6631,
      longitude: -79.6025,
      title: "Point 1",
      description: "First point"
  },
  {
      latitude: 43.6631,
      longitude: -79.6025,
      title: "Point 2",
      description: "Second point"
  },
  {
      latitude: 43.6631,
      longitude: -79.6025,
      title: "Point 3",
      description: "Third point"
  }
];

function initMap () {
  var mapOptions = {
    center: new google.maps.LatLng(43.65432, -79.38347),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  //Attach click event handler to the map.
  google.maps.event.addListener(map, 'click', function (e) {
    //Determine the location where the user has clicked.
    var location = e.latLng;
    // var latlongLocation = [location.lat(),location.lng()]
    // pointsArray.push(latlongLocation);
    // console.log(pointsArray);
    console.log(location.lat());
    console.log(location.lng());
    //Create a marker and placed it on the map.
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    //Attach click event handler to the marker.
    google.maps.event.addListener(marker, "click", function (e) {
      var infoWindow = new google.maps.InfoWindow({
        content:

          '<form class="create-point">' +
          '<input name="latitude" type="hidden" value="' + location.lat() + '" />' +
          '<input name="longitude" type="hidden" value="' + location.lng() + '" />' +
          '<p>Title</p>' +
          '<input id="title" type="text" name="title" placeholder="title">' +

          '<p>Description</p>' +
          '<input id="description" type="text" name="description" placeholder="description">' +

          '<button type ="submit" >Update</button>' +
          '</form>'

      });
      infoWindow.open(map, marker);

      google.maps.event.addListener(infoWindow, 'domready', function () {
        // $(".create-point").on("submit", function (ev) {
        //     ev.preventDefault();
        //       $.ajax({
        //         url: "/createmaps",
        //         method: "POST",
        //         data: pointsArray

        //       }).then(function () {
        //           console.log("info added")
        //       })
        //   })
      });
    });
  });
};


$(document).ready(function () {
  return;
  // ajax POST to /maps -> receive map ID
  // then for each point: ajax POST to /points with point information, map ID, and user ID
  $.ajax({
    url: "/maps", //intermediate route to get the map id
    method: "POST",
    data: {
      map_name: "Test map"
    }
  }).then(function (response) {
    console.log("after POST to /maps", response);
    pointsArray.forEach(function (point) {
      point.map_id = response.id;
      createPoint(point);
    });
    // redirect to the new map page
    window.location.replace(`/maps/${response.id}`)
  }).catch(function (error) {
    console.log("Error:", error);
  })

})  

function createPoint(point) {
  $.ajax({
    url: "/points", //intermediate route to get the map id
    method: "POST",
    data: point
  }).then(function () {
    console.log("one point created")
    // should see the map ID
  }).catch(function (error) {
    console.log("Error:", error);
  })
}
