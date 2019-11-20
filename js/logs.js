


function getLogs(){
    token = $.session.get("auth_token");
    return $.ajax({
        type: 'get',
        url : 'http://localhost:8080/dynamictodolist_war_exploded/services/manager/logs',
        success : function(r) {
            //go to next page
            console.log(r);
            for(i = 0; i < r.length; i++){
                $("#log-field").append("<p class='log'>" + r[i] + "</p><br>");
            }
        },
        headers: {
            "Authorization": 'Bearer ' + token
        },
        crossDomain : true,
        dataType : 'json',
        contentType: 'text/plain',
        error: function(r) {
            console.log(r.error)
        }
    });
}

function getStatus(){
    token = $.session.get("auth_token");
    return $.ajax({
        type: 'get',
        url : 'http://localhost:8080/dynamictodolist_war_exploded/services/manager/logs-status',
        success : function(r) {
            //go to next page
            console.log(r.status);
            if(r.status){
                $("#log-checkbox").prop('checked', true);
            }
            else{
                $("#log-checkbox").prop('checked', false);
            }
        },
        headers: {
            "Authorization": 'Bearer ' + token
        },
        crossDomain : true,
        dataType : 'json',
        error: function(r) {
            console.log(r.error)
        }
    });
}

getLogs();
getStatus();

$("#log-checkbox").on("click", function(){
    $.ajax({
        type: 'post',
        url : 'http://localhost:8080/dynamictodolist_war_exploded/services/manager/logs-status',
        success : function(r) {
            //go to next page
            getStatus();
        },
        data : {
            status : $("#log-checkbox").is(":checked")
        },
        headers: {
            "Authorization": 'Bearer ' + token
        },
        crossDomain : true,
        dataType : 'json',
        error: function(r) {
            console.log(r.error)
        }
    });
});