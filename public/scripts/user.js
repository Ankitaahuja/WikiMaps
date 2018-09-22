
$(() => {
  $.ajax({
    method: "GET",
    url: "/mapslist"
  }).done((result) => {
    result.mapsArray.forEach(function(map) {
      $("<li>").html(map.map_name).appendTo($("#dropdown-maps")).contents().wrap(`<a href='/maps/${map.map_id}'></a>`);
    })
  });;
});