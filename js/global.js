
var globalUrl = 'http://localhost:8080/dynamictodolist_war_exploded/';
var userType = "passenger";

if($.session.get("auth_token") == null){
    window.location.assign('/login');
}


$("#logout-btn").on("click", function(){
    $.session.remove("auth_token");
    window.location.assign('/login');
});



function checkType(){
    token = $.session.get("auth_token");
    return $.ajax({
        type: 'get',
        url : 'http://localhost:8080/dynamictodolist_war_exploded/services/passenger/type',
        success : function(r) {
            //go to next page
            console.log(r.type);
            userType = r.type
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
checkType().then(function(){
    if(userType == "manager"){
        $('#navbar-items').append("<li><a href='/logs'>Show Logs</a></li>")
        $('#navbar-items').append("<li><a href='/employees'>Employees</a></li>")
        $('#navbar-items').append("<li><a href='/routes'>Create Routes</a></li>")
        $('#navbar-items').append("<li><a href='/manage-routes'>Manage Routes</a></li>")
    }

    if(userType == "agent"){
        $('#navbar-items').append("<li><a href='/refund'>Refund Requests</a></li>")
    }
});