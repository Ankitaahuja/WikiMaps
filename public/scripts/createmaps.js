var pointsArray = [];
    window.onload = function () {
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
                '<p class="hide"> latitude: '+location.lat()+'</p>' +
                '<p class="hide"> longitude: '+location.lng()+'</p>' +
                '<p>Title</p>' +
                '<input id="title" type="text" name="title" placeholder="title">' +  

                '<p>Description</p>' +
                '<input id="description" type="text" name="description" placeholder="description">' +
            
                '<button type ="submit" >Update</button>' +  
                '</form>'
                
            });
            infoWindow.open(map, marker);
        });
    });
};


// $(document).ready(function () {

//     $(".create-point").on("submit", function (ev) {
//       ev.preventDefault();
//         $.ajax({
//           url: "/createmaps",
//           method: "POST",
//           data: $(this).serialize()

//         }).then(function () {
//             console.log("info added")
//         })
//       }
//     })