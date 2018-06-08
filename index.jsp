<%@ page import="com.chimerasys.User" %>
<%  User u = (User) session.getAttribute("user");
    if (u == null) {
       response.sendRedirect(request.getContextPath() + "/login.jsp");
    }
%>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>Intranet</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="js/multiupload.js"></script>
    <script type='application/javascript' src="js/intranet.js"></script>
    <link rel="stylesheet" href="css/intranet.css">
</head>

<body>
<div id="wrapper">
    <div class="logo">
        <img src="images/intranet_logo.jpg" alt="Intranet-Logo" />
    </div>

<h1>Intranet</h1>

<P>Bitte wählen Sie ein Modul:</P>

    <a class="card tile" href="documents.jsp">Dokumenten Management System</a>
    <a class="card tile" href="chat.jsp">Chat</a>
    <a class="card tile" href="user.jsp">Benutzer</a>
    <a class="card tile" href="crm.jsp">Customer Relations Management</a>
    <a class="card tile" href="calendar.jsp">Firmen&shy;kalender</a>
    <a class="card tile" href="customers.jsp">Kunden&shy;stamm</a>
    <a class="card tile" href="conferencerooms.jsp">Konferenz&shy;räume Reservieren</a>

</div>
</html>
