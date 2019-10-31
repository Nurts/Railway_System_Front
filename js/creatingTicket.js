let dropdown = $('#departure');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Departure Station>');
dropdown.prop('selectedIndex', 0);

const url = 'http://localhost:8080/dynamictodolist_war_exploded/services/station';

$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option>').text(entry.city).attr('value', entry.name));
  })
});

let drop = $('#destination');

drop.empty();

drop.append('<option selected="true" disabled>Choose Destination Station>');
drop.prop('selectedIndex', 0);

$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    drop.append($('<option>').text(entry.city).attr('value', entry.name));
  })
});

/*let newTicket = $('#departure');

$.getJSON('assets/tickets.json', function(data){
    $.newTicket.append($('<option>').text(entry.city).attr('value', entry.name));
})*/
