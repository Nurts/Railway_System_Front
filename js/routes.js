var table = $("#today");
//var table = $("#train-table");
var order
var row_template2= _.template("<tr><td><select class='hey' id='station<%=n%>'><option value='Station'></option></select></td>\
  <td><input type='time' id='arrival<%=n%>' class='hey'></td>\
  <td><input type='time' id='departure<%=n%>' class='hey'></td>\
  <td><input type='number' class='hey' id='days<%=n%>' min='0' max='5' step='1'></td>\
  <td><button class='paycheck' onclick=createTrainLeg(<%=id%>)>→</button><%=button%></td></tr>")

var row_template = _.template("<table class='mytickets'>\
                                        <thead>\
                                            <tr>\
                                                <th width='15%'>STATION</th>\
                                                <th width='20%'>ARRIVAL TIME</th>\
                                                <th width='20%'>DEPARTURE TIME</th>\
                                                <th width='10%'>JOURNEY DAYS</th>\
                                                <th width='4%'>SUBMIT</th>\
                                            </tr>\
                                        </thead>\
                                        <tbody id = 'train-table'>\
                                        </tbody>\
                                    </table>")

function create(){
	var i=0;
	var s = [];
	    while(i<7) {
	    	var chbox;
	    	chbox=document.getElementById(i);
	    	if(chbox.checked){
	    		 s.push(i.toString());
	    	}
	    	i++;
	    }
	var week = s.join("")
	if(week == ""){
		alert("Choose days");
	} else if($("#compname").val() == "" || $("#typeid").val() == ""){
		alert("Everything has to be filled");
	} else {
		createTrain($("#typeid").val(),week,$("#compname").val());
	}
}

function createTrain(type_id, weekdays, company_name){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/manager/create-train-line',
    data:{
      "train-type-id" : type_id,
      "weekdays" : weekdays,
      "company-name" : company_name
    },
    success : function(r) {
 	  alert("The train is created");
      $("#trainh").prop('hidden','true');
      order = 0;
      table.append(row_template());
      nextStep(r.trainId);
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    crossDomain : true,
    dataType : 'json',
    error: function(r) {
        alert("Paycheck finished with error");
    }
  });
}

function nextStep(train_id){
	//$("#submit").prop('disabled','disabled');

    if(order >= 2){
    	$("#train-table").append(row_template2({
    	  n: order,
      	  id: train_id,
    	  button: "<a href='/routes'><button class='paycheck'>Done</button></a>"
    	}));
    } else {
    	$("#train-table").append(row_template2({
	      n: order,
	      id: train_id,
	      button: null
	    }));
    }
    
    let dropdown = $('#station' + order);

	dropdown.empty();

	dropdown.append('<option selected="true" disabled>Select station');
	dropdown.prop('selectedIndex', 0);

	const url = globalUrl + 'services/station';

	$.getJSON(url, function (data) {
	  $.each(data, function (key, entry) {
	    dropdown.append($('<option>').text(entry.city).attr('value', entry.name).attr('id', entry.id));
	  });
	});
	
}

function createTrainLeg(train_id){
  let station = $("#station" + order).find(":selected").attr('id');
  let arrival = $("#arrival" + order).val();
  let departure = $("#departure" + order).val();
  let day = $("#days" + order).val();
  if(station == "" || arrival == "" || departure == "" || day == ""){
	alert("Everything has to be filled");
  } else {
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/manager/create-train-leg',
    data:{
      "train-id" : train_id,
      "order" : order,
      "station_id" : station,
      "arrival-time" : arrival,
      "departure_time" : departure,
      "arrival_day" : day
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    success : function(r) {
      alert("Tickets for this date successfully created");
      order = order+1;
      nextStep(train_id);
    },
    dataType : 'json',
    error: function(r) {
        alert("Tickets are already created");
    }
  });
  }
}


