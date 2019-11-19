
if($.session.get("auth_token") == null){
    window.location.assign('/login');
}


$("#logout-btn").on("click", function(){
    $.session.remove("auth_token");
    window.location.assign('/login');
});


function isAgent(){
    token = $.session.get("auth_token");
    $.ajax({
        type: 'get',
        url : 'http://localhost:8080/dynamictodolist_war_exploded/services/passenger/type',
        success : function(r) {
            //go to next page
            console.log(r.type);
            
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