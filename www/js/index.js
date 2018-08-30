
$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

$(document).ready(function () {
    var page = "tabbar.html";
    console.log("rememberMe:" + localStorage.getItem("rememberMe"))
    if(localStorage.getItem("rememberMe") == "false"){
        localStorage.loginstatus = false;
    }
    if (localStorage.getItem("loginstatus") != "true"){
        console.log("you are not logged in")
        page = "welcome.html"
    }
    document.querySelector('#splitter-cont').load(page);
    $(window).load(function() {

    });
});
function loginButton(){
    var url = "http://localhost:4000/api/login";
    var email= $.trim($("#login-email").val());
    var password= $.trim($("#login-password").val());
    $("#status").text("Authenticating...");
    var loginString ="email="+email+"&password="+password;
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: url,
        data: loginString,
        success: function(data){
            if(data == "success") {
                $("#status").text("Login Success!");
                localStorage.loginstatus = true;
                if(document.querySelector('#login-rememberMe').checked){
                    localStorage.rememberMe = true;
                }else{
                    localStorage.rememberMe = false;
                }
                document.querySelector('#splitter-cont').load("tabbar.html");
                ons.notification.toast('Welcome back!', { buttonLabel: 'Dismiss', timeout: 1500 })
            }else{
                $("#status").text("Login Failed!");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#status").text("Login Failed! " + XMLHttpRequest.responseText);
         }
    });
}
function forgotPasswordButton(){
    ons.notification.toast('Not implemented yet!', { buttonLabel: 'Dismiss', timeout: 1500 })
}
function registerButton(){
        var url = "http://localhost:4000/api/register";
        var username= $.trim($("#register-username").val());
        var email= $.trim($("#register-email").val());
        var password= $.trim($("#register-password").val());
        var repeat_password= $.trim($("#register-repeat-password").val());
        if(repeat_password == password){
            $("#status").text("Creating New Account...");
            var dataString="username="+username+"&email="+email+"&password="+password+"&confirm_password="+repeat_password;
            $.ajax({
                type: "POST",crossDomain: true, cache: false,
                url: url,
                data: dataString,
                success: function(data){
                    if(data == "success"){
                        $("#status").text("Registered success");
                        if(document.querySelector('#login-rememberMe').checked){
                            localStorage.rememberMe = true;
                        }else{
                            localStorage.rememberMe = false;
                        }
                        localStorage.loginstatus = true;
                        document.querySelector('#splitter-cont').load("tabbar.html");
                        ons.notification.toast('Hi there!', { buttonLabel: 'Dismiss', timeout: 1500 })
                    }else if( data == "exist")
                        $("#status").text("Account is already there");
                    else 
                    $("#status").text("Register Failed");
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $("#status").text("Login Failed! " + XMLHttpRequest.responseText);
                }
            });
        }else{
            $("#status").text("Check password!");
        }
}
function logoutButton(){
    localStorage.loginstatus = false;
    document.querySelector('#splitter-cont').load("welcome.html");
    ons.notification.toast('See you soon!', { buttonLabel: 'Dismiss', timeout: 1500 })
}