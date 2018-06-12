$(function() {
    $('[data-toggle="tooltip"]').tooltip();
})

function login() {
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=login",
        data: {
            email: $("#email").val(),
            password: $("#email").val()
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

function positiv_Feedback(response) {
    if (response.status == "OK") {
        var div_feedback = $("<div class='alert alert-success alert-dismissible'>").text("Aktion erfolgreich!");
        var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='update()'>").text("X");
        $("#http-status").append(div_feedback);
        $(div_feedback).append(close_btn);
    } else {
        create_Error(response.message);
    }
}

function create_Error(Message) {
    var div_error = $("<div class='alert alert-success alert-dismissible'>").text(Message);
    var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='update()'>").text("X");
    $("#http-status").append(div_error);
    $(div_error).append(close_btn);
}