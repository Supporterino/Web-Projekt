// This is the JavaScript Code for the User-Management of the intranet
// @authors Martin Stöcker, Julian Schwart, Florian Jonkheer and Lars Roth
// v1.0

// Inital Documentloading Function
var Users;

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        update();
    });
})

// Function for Searchbar

function search(origin) {
    var value = $(origin).val().toLowerCase();
    $("#tbod1 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#tbod2 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

// Function for Displaying the Data

function create_Users() {
    var search = $("<input type='text' placeholder='Suche nach Namen' id='uSearch' name='uSearch' onkeyup='search(this)'>");
    var search2 = $("<input type='text' placeholder='Suche nach Namen' id='uSearch2' name='uSearch' onkeyup='search(this)'>");
    $("#tabs-1").append(search);
    $("#tabs-2").append(search2);
    if ($("#sel1").val() == "Card Darstellung") {
        create_Card();
    } else {
        var loc = ['#tabs-1', '#tabs-2'];
        for (var i = 0; i < 2; i++) {
            create_Tablestructure(loc[i]);
            create_Table(loc[i]);
        }
    }
}

// Displaystyle - Cards

function create_Card() {
    for (var i = 0; i < Users.length; i++) {
        var main_div = $("<div class='user-box'></div>");
        var sec_div = $("<div class='card user'>");
        var third_div = $("<div class='card-body'>");
        var header = $("<h1 class='card-title'>").text(Users[i].firstname + ' ' + Users[i].lastname);
        if (Users[i].hasOwnProperty('deletionDate')) {
            var sub_title1 = $("<h6 class='card-subtitle creation blockify'>").text('Gelöscht am:' + Users[i].deletionDate);
        } else {
            var sub_title1 = $("<h6 class='card-subtitle creation blockify'>").text('Erstellt am:' + Users[i].creationDate);
        }
        var span1 = $("<span class='deluser'>");
        var span2 = $("<span class='deluser'>");
        if (Users[i].hasOwnProperty('deletionDate')) {
            var react_btn = $("<button class='btn btn-block blockify' onclick='react_User(this)'>").text("Reaktivieren");
        } else {
            var del_btn = $("<button class='btn btn-block blockify' onclick='del_User(this)'>").text("Delete");
            var newpw_btn = $("<button class='btn btn-block blockify' onclick='new_Pass(this)'>").text("New Password");
        }


        switch (Users[i].role) {
            case 2:
                var sub_title2 = $("<h6 class='card-subtitle creation role_high blockify'>").text("Administrator");
                break;

            default:
                var sub_title2 = $("<h6 class='card-subtitle creation blockify'>").text("Benutzer");
                break;

        }
        header.attr('id', Users[i].id);
        if (!Users[i].hasOwnProperty('deletionDate')) {
            $("#tabs-1").append(main_div);
            $(main_div).append(sec_div);
            $(sec_div).append(third_div);
            $(third_div).append(header, sub_title1, sub_title2, span1, span2);
            $(span1).append(del_btn);
            $(span2).append(newpw_btn);
        } else {
            $("#tabs-2").append(main_div);
            $(main_div).append(sec_div);
            $(sec_div).append(third_div);
            $(third_div).append(header, sub_title1, sub_title2, span1, span2);
            $(span1).append(react_btn);
        }
    }
}

// Displaystyle - Table
// Tableheader

function create_Tablestructure(location) {
    var table = $("<table class='table table-striped'>");
    var thead = $("<thead>");
    var tr = $("<tr>");
    var first = $("<td>").text("Vorname");
    var last = $("<td>").text("Nachname");
    var role = $("<td>").text("Rolle");
    var action = $("<td>").text("Aktionen");

    switch (location) {
        case "#tabs-1":
            var tbody = $("<tbody id='tbod1'>");
            var date = $("<td>").text("Erstellt am");
            break;
        case "#tabs-2":
            var tbody = $("<tbody id='tbod2'>");
            var date = $("<td>").text("Gelöscht am");
            break;
        default:
            break;
    }

    $(location).append(table);
    $(table).append(thead, tbody);
    $(thead).append(tr);
    $(tr).append(first, last, date, role, action);
}

// Tabledata

function create_Table(location) {
    for (var i = 0; i < Users.length; i++) {
        var tr = $("<tr>");
        var td1 = $("<td>").text(Users[i].firstname);
        var td2 = $("<td>").text(Users[i].lastname);
        switch (location) {
            case "#tabs-1":
                var td3 = $("<td>").text(Users[i].creationDate);
                break;
            case "#tabs-2":
                var td3 = $("<td>").text(Users[i].deletionDate);
                break;
            default:
                break;
        }
        switch (Users[i].role) {
            case 2:
                var td4 = $("<td class='role_high'>").text("Administrator");
                break;

            default:
                var td4 = $("<td>").text("Benutzer");
                break;

        }

        switch (location) {
            case "#tabs-1":
                var btn_del1 = $("<div class='dropdown'>");
                var btn_del2 = $("<button type='button' class='btn dropdown-toggle' data-toggle='dropdown'>").text("Aktionen");
                var btn_del3 = $("<div class='dropdown-menu'>");
                var btn_del4 = $("<a class='dropdown-item' onclick='del_User_table(this)'>").text("Delete");
                var btn_del5 = $("<a class='dropdown-item' onclick='new_Pass_table(this)'>").text("New Password");
                break;
            case "#tabs-2":
                var react_btn = $("<button class='btn btn-block blockify' onclick='react_User_table(this)'>").text("Reaktivieren");
                break;
            default:
                break;
        }


        td1.attr('id', Users[i].id);
        switch (location) {
            case "#tabs-1":
                if (!Users[i].hasOwnProperty('deletionDate')) {
                    $("#tbod1").append(tr);
                    $(tr).append(td1, td2, td3, td4, btn_del1);
                    $(btn_del1).append(btn_del2, btn_del3);
                    $(btn_del3).append(btn_del4, btn_del5);
                }
                break;
            case "#tabs-2":
                if (Users[i].hasOwnProperty('deletionDate')) {
                    $("#tbod2").append(tr);
                    $(tr).append(td1, td2, td3, td4, react_btn);
                }
                break;
            default:
                break;
        }

    }
}

// Utility Functions

function update() {
    $("#tabs-1").html("");
    $("#tabs-2").html("");
    $("#tabs-3").html("");
    $("#http-status").html("");
    get_Data();
}

function check_Equality() {
    var password1 = $("#password").val();
    var password2 = $("#password2").val();
    if (password1 == password2) {
        return true;
    } else {
        return false;
    }
}

function clear_Form() {
    $("#password").val('').blur();
    $("#password2").val('').blur();
    $("#email").val('').blur();
    $("#vname").val('').blur();
    $("#nname").val('').blur();
}

function positiv_Feedback(response) {
    if (response.status == "OK") {
        var main_div = $("<div class='alert alert-success alert-dismissible'>").text("Aktion erfolgreich!");
        var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='update()'>").text("X");
        $("#http-status").append(main_div);
        $(main_div).append(close_btn);
    } else {
        create_Error(response.message);
    }
}

function create_Error(Message) {
    var main_div = $("<div class='alert alert-success alert-dismissible'>").text(Message);
    var close_btn = $("<button type='button' class='close' data-dismiss='alert' onclick='update()'>").text("X");
    $("#http-status").append(main_div);
    $(main_div).append(close_btn);
}

// Functions with AJAX - Use

// Get Data from Server

function get_Data() {
    Users = null;
    $.get("http://h2669567.stratoserver.net:8080/intranet/jsonusers.jsp", function(data) {
        Users = data.users;
        console.log(Users);
        if (data.status != "ok") {
            create_Error(data.status);
        }

        create_Users();

    });
}

// Create New User

function add_User() {
    if (!check_Equality()) {
        create_Error("Passwort stimmt nicht überein.");
        $("#password").val('').blur();
        $("#password2").val('').blur();
    } else {
        var role;
        if ($("#sel2").val() == "Administrator") {
            role = 2;
        } else {
            role = 1;
        }
        $.ajax({
            type: "POST",
            url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=newuser",
            data: {
                email: $("#email").val(),
                firstname: $("#vname").val(),
                lastname: $("#nname").val(),
                password: $("#password").val(),
                role: role
            },
            success: function(msg) {
                var main_div = $("<div class='alert alert-success'>").text("Benutzer erfolgreich erstellt!");
                $("#http-status").append(main_div);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                create_Error(errorThrown);
            }
        });
        clear_Form();
    }
}

// Delete User

function del_User(origin) {
    var id = $(origin).parent().parent().find("h1").attr("id");
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=deluser",
        data: {
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

function del_User_table(origin) {
    var id = $(origin).parent().parent().parent().find("td").attr("id");
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=deluser",
        data: {
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

// New Password

function new_Pass(origin) {
    var id = $(origin).parent().parent().find("h1").attr("id");
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=newpass",
        data: {
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

function new_Pass_table(origin) {
    var id = $(origin).parent().parent().parent().find("td").attr("id");
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=newpass",
        data: {
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

// Reactivate User

function react_User(origin) {
    var id = $(origin).parent().parent().find("h1").attr("id");
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=actuser",
        data: {
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

function react_User_table(origin) {
    var id = $(origin).parent().find("td").attr("id");
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=actuser",
        data: {
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}