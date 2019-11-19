let dropdown = $('#departure');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Departure Station');
dropdown.prop('selectedIndex', 0);

const url = 'http://localhost:8080/dynamictodolist_war_exploded/services/station';


$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option>').text(entry.city).attr('value', entry.name).attr('id', entry.id));
  });
});

let drop = $('#destination');

drop.empty();

drop.append('<option selected="true" disabled>Destination Station');
drop.prop('selectedIndex', 0);

$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    drop.append($('<option>').text(entry.city).attr('value', entry.name).attr('id', entry.id));
  })
});


$("#searchform").submit(false);
var table = $("#train-table");

var row_template = _.template('<tr> <td><%=from%></td> <td><%=to%></td> <td><%=dtime%></td> <td><%=atime%></td> <td><button class="buybutton" onclick=searchTickets(<%=id%>)>BUY</button></td> </tr>')
var ticketDate;

function searchTrains(){
  let from = dropdown.find(":selected").attr('id');
  let to = drop.find(":selected").attr('id');
  if(from == null){
    from = 0;
  }
  if(to == null){
    to = 0;
  }
  let date = new Date($('#date-input').val());
  ticketDate = date;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  $.ajax({
    type: 'get',
    url : 'http://localhost:8080/dynamictodolist_war_exploded/services/routes',
    data:{
      "day" : day,
      "month" : month,
      "year" : year,
      "from" : from,
      "to" : to
    },
    success : function(r) {
      table.empty();
      let i = 0;  
      for(i = 0; i < r.length; i++){
        let train = r[i];
        console.log(train);
        table.append(row_template({
          from: train.origin_city, 
          to: train.destination_city,
          dtime: train.departure_time,
          atime: train.arrival_time,
          id: train.id
        }));
      }
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#today").offset().top
      }, 100);
        
    },
    dataType : 'json',
    error: function(r) {
        alert("Please choose a date");
    }
  });
}

$("#search-trains").on('click', searchTrains);


function showForToday(){
  let now = new Date();

  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);

  let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

  $('#date-input').val(today);
  searchTrains();

}

function showModal(){
  var modal = document.getElementById("ticketsModal");
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";
  console.log("here")
  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

var ticket_template = _.template('<tr> <td><%=place%></td> <td><%=wagon%></td> <td><%=stype%></td> <td><%=price%></td> <td><button class="buybutton">BUY</button></td> </tr>')
var ticket_table = $("#ticket-table");

function searchTickets(train_id){
  let day = ticketDate.getDate();
  let month = ticketDate.getMonth() + 1;
  let year = ticketDate.getFullYear();
  $.ajax({
    type: 'get',
    url : 'http://localhost:8080/dynamictodolist_war_exploded/services/routes/' + train_id + '/tickets',
    data:{
      "day" : day,
      "month" : month,
      "year" : year
    },
    success : function(r) {
      let i = 0;  
      ticket_table.empty();
      for(i = 0; i < r.length; i++){
        let ticket = r[i];
        console.log(ticket);
        if(ticket.isAvailable === false){
          continue;
        }
        ticket_table.append(ticket_template({
          place : ticket.place,
          wagon : ticket.carriage_number,
          stype : ticket.seat_type,
          price : ticket.price
        }));
      }
      
      showModal();
      
    },
    dataType : 'json',
    error: function(r) {
        alert("No Tickets Available");
    }
  });
}

showForToday();
