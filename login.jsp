<!-- <%@ page import="com.chimerasys.User" %>
    <%  User u = (User) session.getAttribute("user");
    if (u != null) {
        response.sendRedirect(request.getContextPath() + "/index.jsp");
    }
    String email = request.getParameter("email");  
    String password = request.getParameter("password");
    if (email != null && password != null) {
        u = new User(1);
        u.setEmail(email);
        u.setFirstname("Michael");
        u.setLastname("Janich");
        session.setAttribute("user", u);
        response.sendRedirect(request.getContextPath() + "/index.jsp");
     }
%> -->
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Intranet Login</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" />

    <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>

    <script src="js/login.js"></script>
    <link rel="stylesheet" href="css/intranet.css">
</head>

<body>
    <div id="wrapper">
        <div class="logo">
            <img src="images/intranet_logo.jpg" alt="Intranet-Logo" />
        </div>

        <h1>Intranet Login</h1>

        <div id="http-status">
        </div>

        <div id="login">
            <form action='login.jsp' method='POST'>
                <input type='email' name='email' focus placeholder='username@example.de' data-toggle="tooltip" title="E-Mail Adresse" data-placement="bottom"><br>
                <input type='password' name='password' placeholder="*****" data-toggle="tooltip" title="Passwort" data-placement="bottom"><br>
                <button type="button" class="btn" onclick="login()">Log In</button>
            </form>
        </div>
    </div>

</html>