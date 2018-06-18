<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="utf-8" />
    <title>Intranet User Manager</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>

    <script src="js/functions.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no" />
    <link rel="stylesheet" href="css/user.css" />
</head>

<body>
    <div id="wrapper">

        <div class="logo">
            <a href="index.jsp"><img src="images/intranet_logo.jpg" alt="Intranet-Logo" /></a>
        </div>

        <nav id="tabs">
            <ul class="nav nav-tabs">
                <li><a class="nav-link" data-toggle="tab" href="#tabs-1">Aktive User</a></li>
                <li><a class="nav-link" data-toggle="tab" href="#tabs-2">Inaktive Nutzer</a></li>
                <li><a class="nav-link" data-toggle="tab" href="#tabs-3">Archiv</a></li>
                <li><a class="nav-link" data-toggle="tab" href="#tabs-4">Neuen User Anlegen</a></li>
                <li class="move_right">
                    <label class="switch" data-toggle="tooltip" title="Card Darstellung" data-placement="bottom">
                        <input type="checkbox" id="cb" checked="checked" onchange="switch_View()">
                        <span class="slider round"></span>
                    </label>
                </li>
            </ul>
        </nav>

        <div id="http-status">
        </div>

        <div class="tab-content">

            <div id="tabs-1" class="tab-pane fade search_card">
                <!-- <h2>Aktive User</h2> -->
            </div>
            <div id="tabs-2" class="tab-pane fade search_card">
                <!-- <h2>Inaktive User</h2> -->

            </div>
            <div id="tabs-3" class="tab-pane fade search_card">
                <!-- <h2>Archiv</h2> -->

            </div>
            <div id="tabs-4" class="tab-pane fade search_card">
                <!-- <h2>Neuen User anlegen</h2> -->
                <div class="form-group">
                    <label for="email">E-Mail:</label>
                    <input type="email" class="form-control" id="email" placeholder="username@example.de" data-toggle="tooltip" title="E-Mail Adresse" data-placement="bottom">
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" placeholder="*****" data-toggle="tooltip" title="Passwort" data-placement="bottom">
                    <label for="password2">Passwort wiederholen:</label>
                    <input type="password" class="form-control" id="password2" placeholder="*****" data-toggle="tooltip" title="Passwort" data-placement="bottom">
                </div>
                <div class="form-group">
                    <label for="vname">Vorname:</label>
                    <input type="text" class="form-control" id="vname" placeholder="Max" data-toggle="tooltip" title="Vorname" data-placement="bottom">
                </div>
                <div class="form-group">
                    <label for="nname">Nachname:</label>
                    <input type="text" class="form-control" id="nname" placeholder="Mustermann" data-toggle="tooltip" title="Nachname" data-placement="bottom">
                </div>
                <div class="form-group">
                    <label for="role">Rolle:</label>
                    <select class="form-control" id="sel2" data-toggle="tooltip" title="Rolle" data-placement="bottom">
                            <option>Benutzer</option>
                            <option>Administrator</option>
                        </select>
                </div>

                <button type="button" class="btn btn-block" onclick="add_User()">Submit</button>

            </div>

        </div>

    </div>
</body>

</html>