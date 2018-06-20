// This is the JavaScript Code for the Login of the intranet
// @authors Martin Stöcker, Julian Schwart, Florian Jonkheer and Lars Roth
// v1.1

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
})

function login() {
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=login",
        cache: false,
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

function positiv_Feedback(response) {

    // Function to create a response status node

    if (response.status == "ok") {

        // Creation of the status node with success message

        var div_feedback = $("<div class='alert alert-success alert-dismissible'>").text("Aktion erfolgreich!");
        var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='update()'>").text("X");

        // Adding the node to the top of the page

        $("#http-status").append(div_feedback);
        $(div_feedback).append(close_btn);
    } else {

        // Sends error to the error-function

        create_Error(response.message);
    }
}

function create_Error(Message) {

    // Creation of the error node

    var div_error = $("<div class='alert alert-danger alert-dismissible'>").text(Message);
    var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='update()'>").text("X");

    // Adding the node to the top of the page

    $("#http-status").append(div_error);
    $(div_error).append(close_btn);
}