let dropdown = $('#departure');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Departure Station>');
dropdown.prop('selectedIndex', 0);

const url = 'http://localhost:8080/dynamictodolist_war_exploded/services/station';

$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option>').text(entry.city).attr('value', entry.name).attr('id', entry.id));
  });
});

let drop = $('#destination');

drop.empty();

drop.append('<option selected="true" disabled>Choose Destination Station>');
drop.prop('selectedIndex', 0);

$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    drop.append($('<option>').text(entry.city).attr('value', entry.name).attr('id', entry.id));
  })
});


$.getJSON('http://localhost:8080/dynamictodolist_war_exploded/services/routes', function(data) {
    $.each(data, function (index, item) {

    var eachrow = "<tr>"
    + "<td style=\"text-align: center;\">" + item.origin_city + "</td>"
    + "<td style=\"text-align: center;\">" + item.destination_city + "</td>"
    + "</tr>";
    $('#tbody').append(eachrow);

})});
