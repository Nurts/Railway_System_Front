var table = $("#train-table");

var row_template

checkType().then( function (){
  if(userType === "manager"){
    row_template = _.template("<tr><td><%=fname%></td>\
  <td><%=lname%></td>\
  <td><%=type%></td>\
  <td><%=salary%></td>\
  <td><%=worksince%></td>\
  <td><%=id%></td>\
  <td><button class='paycheck' onclick=searchTickets(<%=id%>)>PAYCHECK</button></td></tr>")
  }
  listEmployees();
});//

function listEmployees(){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'get',
    url : globalUrl + 'services/manager/employees',
    success : function(r) {
      table.empty();
      let i = 0;  
      for(i = 0; i < r.length; i++){
        let employee = r[i];
        console.log(employee);
        table.append(row_template({
          fname: employee.firstName, 
          lname: employee.lastName,
          type: employee.type,
          salary: employee.salary,
          worksince: employee.workSince,
          id: employee.id
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
        alert("Please choose a date");
    }
  });
}


function searchTickets(employee_id){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/manager/make-payroll',
    data:{
      "employee-id" : employee_id
    },
    success : function(r) {
      alert("You made paycheck");
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
/*
function createTickets(train_id){
  let day = ticketDate.getDate();
  let month = ticketDate.getMonth() + 1;
  let year = ticketDate.getFullYear();
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/agent/create-seat-instances',
    contentType: 'application/x-www-form-urlencoded',
    data:{
      "day" : day,
      "month" : month,
      "year" : year,
      "train-id" : train_id
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    success : function(r) {
      alert("Tickets for this date successfully created")
      
    },
    dataType : 'json',
    error: function(r) {
        alert("Tickets are already created");
    }
  });
}

*/

