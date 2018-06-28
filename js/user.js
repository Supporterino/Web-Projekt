// This is the JavaScript Code for the User-Management of the intranet
// @authors Martin Stöcker, Julian Schwart, Florian Jonkheer and Lars Roth
// v1.3

// Inital Documentloading Function
var Users;

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        update();
    });
    update();
})

// Function for Searchbar

function search(origin) {
    var value = $(origin).val().toLowerCase();

    // Searching in Tableview

    $("#tbod1 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#tbod2 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#tbod3 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

    //Searching in Cardview

    $("#tabs-1 h1").filter(function() {
        $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

    $("#tabs-2 h1").filter(function() {
        $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

// Function for Displaying the Data

// Displaying the Searchbars

function create_Users() {
    var search = $("<input type='text' placeholder='Suche nach Namen' id='uSearch' name='uSearch' onkeyup='search(this)'>");
    var search2 = $("<input type='text' placeholder='Suche nach Namen' id='uSearch2' name='uSearch' onkeyup='search(this)'>");
    $("#tabs-1").append(search);
    $("#tabs-2").append(search2);

    if ($("#cb").prop("checked")) {
        create_Card();
    } else {
        var locations = ['#tabs-1', '#tabs-2'];
        for (var i = 0; i < 2; i++) {
            create_Tablestructure(locations[i]);
            create_Table(locations[i]);
        }
    }

    create_Archive();
}

// Displaystyle - Cards

function create_Card() {
    for (var i = 0; i < Users.length; i++) {

        // Create basic card-structure

        var card_holder = $("<div class='user-box'></div>");
        var card = $("<div class='card user'></div>");
        var card_header = $("<div class='card-header'>");
        var card_body = $("<div class='card-body'>");

        //Create card-heading also known as name

        var header = $("<h1 class='card-title'>").text(Users[i].firstname + ' ' + Users[i].lastname);
        header.attr('id', Users[i].id);

        // Decides if user is deleted or not and gives it the right date to show

        if (Users[i].hasOwnProperty('deletionDate')) {
            var sub_title1 = $("<h6 class='card-subtitle creation blockify'>").text('Gelöscht am:' + Users[i].deletionDate);
        } else {
            var sub_title1 = $("<h6 class='card-subtitle creation blockify'>").text('Erstellt am:' + Users[i].creationDate);
        }

        // Determinates the role of the user and adds it as card-information

        switch (Users[i].role) {
            case 2:
                var sub_title2 = $("<h6 class='card-subtitle role_high blockify'>").text("Administrator");
                break;

            default:
                var sub_title2 = $("<h6 class='card-subtitle creation blockify'>").text("Benutzer");
                break;

        }

        //Creatin of the Emailpart

        var sub_title3 = $("<a class='card-subtitle creation blockify'>").text(Users[i].email);
        $(sub_title3).attr('href', 'mailto:' + Users[i].email);

        // Creation of the placeholder for the buttons

        var span1 = $("<span class='deluser'>");
        var span2 = $("<span class='deluser'>");

        // Creation of the button considering the state of the user which buttons are needed

        if (Users[i].hasOwnProperty('deletionDate')) {
            var react_btn = $("<button class='btn btn-block blockify' onclick='react_User(this)'>").text(" Reaktivieren");
        } else {
            var del_btn = $("<button class='btn btn-block blockify' onclick='del_User(this)'>").text(' Delete');
            var newpw_btn = $("<button class='btn btn-block blockify' onclick='new_Pass(this)'>").text(" New Password");
        }

        // Adds the cards to the according tab (Active/Deleted)

        if (!Users[i].hasOwnProperty('deletionDate')) {
            $("#tabs-1").append(card_holder);
            $(card_holder).append(card);
            $(card).append(card_header, card_body);
            $(card_header).append(header);
            $(card_body).append(sub_title1, sub_title2, sub_title3, span1, span2);
            $(span1).append(del_btn);
            $(del_btn).prepend("<i class='fas fa-trash-alt'></i>");
            $(span2).append(newpw_btn);
            $(newpw_btn).prepend('<i class="fas fa-key"></i>');
        } else {
            $("#tabs-2").append(card_holder);
            $(card_holder).append(card);
            $(card).append(card_header, card_body);
            $(card_header).append(header);
            $(card_body).append(sub_title1, sub_title2, sub_title3, span1);
            $(span1).append(react_btn);
            $(react_btn).prepend('<i class="fas fa-recycle"></i>');
        }
    }
}

// Displaystyle - Table
// Tableheader

function create_Tablestructure(location) {

    // Creation of tablestructure

    var table = $("<table class='table table-striped'>");
    var thead = $("<thead>");

    // Creation of the tableheadings

    var tr = $("<tr>");

    var first = $("<th>").text("Vorname");
    var last = $("<th>").text("Nachname");
    var role = $("<th>").text("Rolle");
    var email = $("<th>").text("Email");
    var action = $("<th>").text("Aktionen");

    // Creation the datecolumn considering the position of the table

    switch (location) {
        case "#tabs-1":
            var tbody = $("<tbody id='tbod1'>");
            var date = $("<th>").text("Erstellt am");
            break;
        case "#tabs-2":
            var tbody = $("<tbody id='tbod2'>");
            var date = $("<th>").text("Gelöscht am");
            break;
        default:
            break;
    }

    // Adding the table to the given tab as parameter of the function

    $(location).append(table);
    $(table).append(thead, tbody);
    $(thead).append(tr);
    $(tr).append(first, last, date, role, email, action);
}

// Tabledata

function create_Table(location) {

    // Cycling  through the Users array and creation a tablerow for each one

    for (var i = 0; i < Users.length; i++) {

        // Creation of the tablerow

        var tr = $("<tr>");

        // Creation of first- & lastname column

        var first = $("<td>").text(Users[i].firstname);
        first.attr('id', Users[i].id);
        var last = $("<td>").text(Users[i].lastname);

        // Creation fo datecolumn considering if user is active or deleted

        switch (location) {
            case "#tabs-1":
                var date = $("<td>").text(Users[i].creationDate);
                break;
            case "#tabs-2":
                var date = $("<td>").text(Users[i].deletionDate);
                break;
            default:
                break;
        }

        // Creation of rolecolumn considering the users role

        switch (Users[i].role) {
            case 2:
                var role = $("<td class='role_high'>").text("Administrator");
                break;

            default:
                var role = $("<td>").text("Benutzer");
                break;

        }

        // Creation of the email

        var email = $("<td>");
        var emaild = $("<a>").text(Users[i].email);
        $(emaild).attr('href', 'mailto:' + Users[i].email);
        $(email).append(emaild);

        // Creation of the buttons considering the needed ones

        switch (location) {
            case "#tabs-1":
                var dropdown = $("<div class='dropdown'>");
                var dropdown_button = $("<button type='button' class='btn dropdown-toggle' data-toggle='dropdown'>").text(" Aktionen");
                var dropdown_menu = $("<div class='dropdown-menu'>");
                var dropdown_item1 = $("<a class='dropdown-item' onclick='del_User(this)'>").text(" Delete");
                var dropdown_item2 = $("<a class='dropdown-item' onclick='new_Pass(this)'>").text(" New Password");
                break;
            case "#tabs-2":
                var react_btn = $("<button class='btn btn-block blockify' onclick='react_User(this)'>").text(" Reaktivieren");
                break;
            default:
                break;
        }

        // Adding the row to the given tab as function parameter

        switch (location) {
            case "#tabs-1":
                if (!Users[i].hasOwnProperty('deletionDate')) {
                    $("#tbod1").append(tr);
                    $(tr).append(first, last, date, role, email, dropdown);
                    $(dropdown).append(dropdown_button, dropdown_menu);
                    $(dropdown_menu).append(dropdown_item1, dropdown_item2);
                    $(dropdown_button).prepend('<i class="fas fa-user-cog"></i>');
                    $(dropdown_item1).prepend("<i class='fas fa-trash-alt'></i>");
                    $(dropdown_item2).prepend('<i class="fas fa-key"></i>');
                }
                break;
            case "#tabs-2":
                if (Users[i].hasOwnProperty('deletionDate')) {
                    $("#tbod2").append(tr);
                    $(tr).append(first, last, date, role, email, react_btn);
                    $(react_btn).prepend('<i class="fas fa-recycle"></i>');
                }
                break;
            default:
                break;
        }

    }
}

// The Archive

function create_Archive() {

    // Creation of the Searchbar

    var search3 = $("<input type='text' placeholder='Suche nach Namen' id='uSearch3' name='uSearch' onkeyup='search(this)'>");

    //  Creation of the tablestructure

    var table = $("<table class='table table-striped'>");
    var thead = $("<thead>");

    // Creation of the tableheadings

    var tr = $("<tr>");

    var first = $("<th>").text("Vorname");
    var last = $("<th>").text("Nachname");
    var role = $("<th>").text("Rolle");
    var email = $("<th>").text("Email");
    var cdate = $("<th>").text("Erstellt am");
    var ddate = $("<th>").text("Gelöscht am");

    var tbody = $("<tbody id='tbod3'>");

    // Adding the tablestructure to the tab

    $("#tabs-3").append(search3, table);
    $(table).append(thead, tbody);
    $(thead).append(tr);
    $(tr).append(first, last, email, cdate, ddate, role);

    // Cycling  through the Users array and creation a tablerow for each one

    for (var i = 0; i < Users.length; i++) {

        //  Creation of tablerow

        var trd = $("<tr>");

        // Creation of the first- & lastname column

        var firstd = $("<td>").text(Users[i].firstname);
        var lastd = $("<td>").text(Users[i].lastname);

        // Creation of the rolecolumn considering the role of the user

        switch (Users[i].role) {
            case 2:
                var roled = $("<td class='role_high'>").text("Administrator");
                break;

            default:
                var roled = $("<td>").text("Benutzer");
                break;

        }

        // Creation of the email

        var email = $("<td>");
        var emaild = $("<a>").text(Users[i].email);
        $(emaild).attr('href', 'mailto:' + Users[i].email);
        $(email).append(emaild);

        // Creation of the datecolumn

        var cdated = $("<td>").text(Users[i].creationDate);
        var ddated = $("<td>").text(Users[i].deletionDate);

        // Adding the row to the table

        $(tbody).append(trd);
        $(trd).append(firstd, lastd, email, cdated, ddated, roled);
    }
}

// Utility Functions

function switch_View() {

    // Function for switching views

    clear_Tabs();
    create_Users();
}

function clear_Tabs() {

    // Function which clears the content of the tabs

    $("#tabs-1").html("");
    $("#tabs-2").html("");
    $("#tabs-3").html("");
    $("#http-status").html("");
}

function update() {

    // Function for updating

    clear_Tabs();
    get_Data();
}

function check_Equality() {

    // Function to check if both entered passwords are equal

    var password1 = $("#password").val();
    var password2 = $("#password2").val();
    if (password1 == password2) {
        return true;
    } else {
        return false;
    }
}

function clear_Form() {

    // Function to clear the inputs in the "New User" tab

    $("#password").val('').blur();
    $("#password2").val('').blur();
    $("#email").val('').blur();
    $("#vname").val('').blur();
    $("#nname").val('').blur();
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

// Functions with AJAX - Use

// Get Data from Server

function get_Data() {
    Users = null;
    $.get("http://h2669567.stratoserver.net:8080/intranet/jsonusers.jsp", function(data) {
        Users = data.users;
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
            url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp",
            cache: false,
            data: {
                action: 'newuser',
                email: $("#email").val(),
                firstname: $("#vname").val(),
                lastname: $("#nname").val(),
                password: $("#password").val(),
                role: role
            },
            success: function(response) {
                positiv_Feedback(response);
            }
        });

        clear_Form();
    }
}

// Delete User

function del_User(origin) {
    if ($("#cb").prop("checked")) {
        var id = $(origin).parent().parent().parent().find("div").find("h1").attr("id");
    } else {
        var id = $(origin).parent().parent().parent().find("td").attr("id");
    }

    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp",
        cache: false,
        data: {
            action: 'deluser',
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

// New Password

function new_Pass(origin) {
    if ($("#cb").prop("checked")) {
        var id = $(origin).parent().parent().parent().find("div").find("h1").attr("id");
    } else {
        var id = $(origin).parent().parent().parent().find("td").attr("id");
    }

    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp",
        cache: false,
        data: {
            action: 'newpass',
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}

// Reactivate User

function react_User(origin) {
    if ($("#cb").prop("checked")) {
        var id = $(origin).parent().parent().parent().find("div").find("h1").attr("id");
    } else {
        var id = $(origin).parent().parent().parent().find("td").attr("id");
    }

    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp",
        cache: false,
        data: {
            action: 'actuser',
            userid: id
        },
        success: function(response) {
            positiv_Feedback(response);
        }
    });
}