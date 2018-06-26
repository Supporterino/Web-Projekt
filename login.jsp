<!-- This is the  Mainpage for the Login of the intranet
@authors Martin Stöcker, Julian Schwart, Florian Jonkheer and Lars Roth
v1.0 -->
<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Martin Stöcker, Julian Schwart, Florian Jonkheer und Lars Roth">
    <title>Intranet Login</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <script src="js/login.js"></script>
    <link rel="stylesheet" href="css/login.css">
</head>

<body>
    <div id="wrapper">
        <div class="logo">
            <img src="images/intranet_logo.jpg" alt="Intranet-Logo" />
        </div>

        <h1>Intranet Login</h1>

        <div id="http-status">
        </div>

        <div class="tab-content">
        <div id="login" class="tab-pane fade active show">
            <form>
                <input id="email" type='email' name='email' focus placeholder='username@example.de' data-toggle="tooltip" title="E-Mail Adresse" data-placement="bottom"><br>
                <input id="password" type='password' name='password' placeholder="*****" data-toggle="tooltip" title="Passwort" data-placement="bottom"><br>
                <button type="button" class="btn shrink" onclick="login()"><i class="fas fa-sign-in-alt"></i> Log In</button>
            </form>
        </div>

        <div id="logged_in" class="tab-pane fade center">
            <div>
                <h2>Willkommen im Intranet.</h2>
                <h3>Sie wurden erfolgreich eingeloggt.</h3>
            </div>
            <div>

            <button type="button" class="btn nav_pane" onclick="window.location.href='index.jsp'"><i class="fas fa-home"></i> Zur Startseite</button>

            <button type="button" class="btn nav_pane" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log out</button>
            </div>
        </div>
        </div>
    </div>

</html>