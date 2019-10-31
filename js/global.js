
$("#logout-btn").on("click", function(){
    $.session.remove("auth_token");
    window.location.assign('/login');
});