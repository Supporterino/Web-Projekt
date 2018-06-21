// This is the JavaScript Code for the Login of the intranet
// @authors Martin Stöcker, Julian Schwart, Florian Jonkheer and Lars Roth
// v1.1

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
})

function login() {
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp",
        cache: false,
        data: {
            action: 'login',
            email: $("#email").val(),
            password: $("#password").val()
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

function logout() {
    $.ajax({
        type: "POST",
        url: "update.jsp",
        cache: false,
        data: {
            action: 'logout'
        },
        success: function(response) {
            if (response.status == "ok") {
                var div_feedback = $("<div class='alert alert-success alert-dismissible'>").text("Logout erfolgreich!");
                var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='logged_out()'>").text("X");
                $("#http-status").append(div_feedback);
                $(div_feedback).append(close_btn);
            } else {
                $("#http-status").append("<div class='alert alert-error alert-dismissible'>Fehler: " + response.message + "</div>");
            }
        },
        error: function(response) {
            var box = $("<div class='alert alert-error'>").text("Fehler beim ausloggen.");
            $("#http-status").append(box);
        }
    });
}

// Functions to switch view

function logged_out() {
    $("#logged_in").removeClass("active show");
    $("#login").addClass("active show");
}

function logged_in() {
    $("#login").removeClass("active show");
    $("#logged_in").addClass("active show");
}


function positiv_Feedback(response) {

    // Function to create a response status node

    if (response.status == "ok") {

        // Forwarding to logged_in View

        logged_in();

    } else {

        // Sends error to the error-function

        create_Error(response.message);
    }
}

function create_Error(Message) {

    // Creation of the error node

    var div_error = $("<div class='alert alert-danger alert-dismissible'>").text(Message);
    var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick=''>").text("X");

    // Adding the node to the top of the page

    $("#http-status").append(div_error);
    $(div_error).append(close_btn);
}