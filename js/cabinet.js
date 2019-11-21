var table = $("#train-table");

var row_template = _.template("<tr><td><%=fname%></td>\
  <td><%=lname%></td>\
  <td><%=trainid%></td>\
  <td><%=from%></td>\
  <td><%=to%></td>\
  <td><%=wagon%></td>\
  <td><%=seat%></td>\
  <td><%=dep%></td>\
  <td><%=arr%></td>\
  <td><button class='refund' onclick=\"makeRefund(<%=ticketid%>)\">REFUND</button></td></tr>")

getListItems();

var stations = [];

function getStations(){
	const url = globalUrl + 'services/station';
	$.getJSON(url, function (data) {
	  $.each(data, function (key, entry) {
	  	stations.push(entry)
	  });
	});
}
getStations();

function getName(station_id){
  let i = 0;
  for(i = 0; i < stations.length; i++){
    if(stations[i].id == station_id){
      return stations[i].city;
    }
  }
}

function getListItems(){
  token = $.session.get("auth_token");
  
  $.ajax({
    type: 'get',
    url : globalUrl + 'services/passenger/tickets',
    success : function(r) {
      table.empty();
      let i = 0;  
      
      for(i = 0; i < r.length; i++){
        let ticket = r[i];
        console.log(ticket);
        console.log(ticket.departureDatetime);
        table.append(row_template({
          fname: ticket.firstName, 
          lname: ticket.secondName,
          trainid: ticket.trainId,
          from: getName(ticket.stationIdFrom), 
          to: getName(ticket.stationIdTo),
          wagon: ticket.wagonNumber,
          seat: ticket.seatNumber,
          dep: ticket.departureDatetime, 
          arr: ticket.arrivalDatetime,
          ticketid: ticket.ticketId
        }));
      }
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#today").offset().top
      }, 100);
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    crossDomain : true,
    dataType : 'json',
    error: function(r) {
        alert("Can not get tickets");
    }
  });
}


function makeRefund(ticket_id){
  token = $.session.get("auth_token");
  console.log(ticket_id);
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/passenger/refund-request',
    data:{
      "ticket-id" : ticket_id
    },
    success : function(r) {
      alert("You made refund request");
      // $("#submit").prop('disabled','disabled');
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    dataType : 'json',
    error: function(r) {
        alert("Refund finished with error");
    }
  });
}