var table = $("#train-table");

checkType().then( function (){
  if(userType === "agent"){
    row_template = _.template("<tr><td><%=fname%></td>\
  <td><%=lname%></td>\
  <td><%=trainid%></td>\
  <td><%=from%></td>\
  <td><%=to%></td>\
  <td><%=wagon%></td>\
  <td><%=seat%></td>\
  <td><%=dep%></td>\
  <td><%=arr%></td>\
  <td><button class='refund' onclick=acceptRefund(<%=ticketid%>)>ACCEPT</button>\
  <button class='refund' onclick=rejectRefund(<%=ticketid%>)>REJECT</button></td></tr>")
  getRefundRequests();
  }
});

function getName(station_id){
	const url = globalUrl + 'services/station';
	$.getJSON(url, function (data) {
	  $.each(data, function (key, entry) {
	  	if(entry.id == station_id){
	  		return entry.name;
	  	}
	  });
	});
}

function getRefundRequests(){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'get',
    url : globalUrl + 'services/agent/refund-requests',
    success : function(r) {
      table.empty();
      let i = 0;  
      for(i = 0; i < r.length; i++){
        let ticket = r[i];
        console.log(ticket);
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
          ticketid: ticket.id
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

function acceptRefund(){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/agent/accept-refund',
    data:{
      "ticket-id" : ticket_id
    },
    success : function(r) {
      alert("You have accepted refund request");
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    crossDomain : true,
    dataType : 'json',
    error: function(r) {
        alert("Accept finished with error");
    }
  });
  getRefundRequests();
}

function rejectRefund(){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/agent/reject-refund',
    data:{
      "ticket-id" : ticket_id
    },
    success : function(r) {
      alert("You have accepted refund request");
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    crossDomain : true,
    dataType : 'json',
    error: function(r) {
        alert("Reject finished with error");
    }
  });
  getRefundRequests();
}

