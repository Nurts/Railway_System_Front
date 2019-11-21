var table = $("#train-table");

var row_template

checkType().then( function (){
  if(userType === "manager"){
    row_template = _.template("<tr><td><%=id%></td>\
  <td><%=cname%></td>\
  <td><%=typeid%></td>\
  <td><%=status%></td>\
  <td><button class='activate' onclick=activateRoute(<%=id%>)>ACTIVATE</button></td>\
  <td><button class='deactivate' onclick=deactivateRoute(<%=id%>)>DEACTIVATE</button></td>\
  <td><button class='sendmail' onclick=sendNotification(<%=id%>)>Send Auto-Notification</button></td></tr>")
  }
  listEmployees();
});//

function listEmployees(){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'get',
    url : globalUrl + 'services/manager/trains',
    success : function(r) {
      table.empty();
      let i = 0;  
      for(i = 0; i < r.length; i++){
        let route = r[i];
        console.log(route);
        table.append(row_template({
          id: route.id, 
          cname: route.companyName,
          typeid: route.trainTypeId,
          status: route.isActive,
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
        alert("Something wrong");
    }
  });
}


function deactivateRoute(train_id){
  token = $.session.get("auth_token");
  $.ajax({
    type: 'post',
    url : globalUrl + 'services/manager/cancel-train-line',
    data:{
      "train-id" : train_id
    },
    success : function(r) {
      alert("Route is deactivated, please refresh page!");
    },
    headers: {
      "Authorization": 'Bearer ' + token
    },
    crossDomain : true,
    dataType : 'json',
    error: function(r) {
        alert("Route status changing finished with error");
    }
  });
}

function activateRoute(train_id){
    token = $.session.get("auth_token");
    $.ajax({
      type: 'post',
      url : globalUrl + 'services/manager/reopen-train-line',
      data:{
        "train-id" : train_id
      },
      success : function(r) {
        alert("Route is activated, please refresh page!");
      },
      headers: {
        "Authorization": 'Bearer ' + token
      },
      crossDomain : true,
      dataType : 'json',
      error: function(r) {
          alert("Route status changing finished with error");
      }
    });
  }

  function sendNotification(train_id){
    token = $.session.get("auth_token");
    $.ajax({
      type: 'post',
      url : globalUrl + 'services/manager/send-notification',
      data:{
        "train-id" : train_id
      },
      success : function(r) {
        alert("Notification is sent successfully!");
      },
      headers: {
        "Authorization": 'Bearer ' + token
      },
      crossDomain : true,
      dataType : 'json',
      error: function(r) {
          alert("Sending notification finished with error");
      }
    });
  }



