<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Password Manager</title>

    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/notificationpopup.css">
    <link rel="stylesheet" href="css/centeredpopup.css">
    <link rel="stylesheet" href="css/dropdown.css">
    <link rel="stylesheet" href="css/mainform.css">
    <link rel="stylesheet" href="css/loginform.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Glory&display=swap" rel="stylesheet">

    <meta name="viewport" content="width=device-width">

    <link rel="icon" type="image/png" href="assets/logo.png"/>

  </head>
  <body>

    <div class="background">

      <!-- Login Form -->
      <div class="login-again-wrapper" id="login-again-wrapper">
        <div class="title-wrapper">
          <h1 id="login-again-title"></h1>
        </div>
        <div id="login-again-passwords">

        </div>
        <div class="logout-btn">
          <img src="assets/icons/shutdown.png" alt="Logout" onClick="logout()" title="Logout">
        </div>
      </div>
      <div class="login-wrapper" id="login-wrapper">

        <div class="login" id="login-form">
          <div class="content">
            <h1>PassX</h1>

            <p class="error" id="login-error"></p>

            <p class="input-label">Username</p>
            <input placeholder="Enter Username" type="text" id="login-username" class="maxLenghtFunction" maxlenght="20" autofocus><div class="icon capslock-icon"><img src="assets/icons/capslock.png"></div>
            <p class="input-label">Password</p>
            <input placeholder="Enter Password" type="password" id="login-password" class="maxLenghtFunction" maxlenght="50"><div class="icon" onClick="toggleLoginPassword()"><img id="login-password-icon" src="assets/icons/visible.png"></div><div class="icon capslock-icon space"><img src="assets/icons/capslock.png"></div>

            <a class="switch" onClick="openRegister()">Create a new account?</a>

            <div class="btn" onClick="checkIfLoginErrorAnOpenCookie()">
              <p>Login</p>
              <span class="BorderTopBottom"></span>
              <span class="BorderLeftRight"></span>
            </div>
          </div>

        </div>

        <div class="register" id="register-form">
          <div class="content">
            <h1>PassX</h1>

            <p class="error" id="register-error"></p>

            <p class="input-label">Username</p>
            <input placeholder="Enter Username" type="text" id="register-username" class="maxLenghtFunction" maxlenght="20"><div class="icon capslock-icon"><img src="assets/icons/capslock.png"></div>
            <p class="input-label">Email</p>
            <input placeholder="Enter Email" type="email" id="register-email" class="maxLenghtFunction" maxlenght="40"><div class="icon capslock-icon"><img src="assets/icons/capslock.png"></div>
            <p class="input-label" >Password</p>
            <input placeholder="Enter Password" type="password" id="register-password" class="maxLenghtFunction" maxlenght="50" ><div class="icon" onClick="toggleRegisterPassword()"><img id="register-password-icon" src="assets/icons/visible.png"></div><div class="icon capslock-icon space"><img src="assets/icons/capslock.png"></div>

            <p class="input-label">Repeat Password</p>
            <input placeholder="Enter Password again" type="password" id="register-repeatpassword" class="maxLenghtFunction" maxlenght="50"><div class="icon capslock-icon"><img src="assets/icons/capslock.png"></div>

            <a class="switch" onClick="openLogin()">Already have an account?</a>

            <div class="btn" onClick="register()">
              <p>Register</p>
              <span class="BorderTopBottom"></span>
              <span class="BorderLeftRight"></span>
            </div>
          </div>

        </div>

      </div>

      <!-- /Login Form\ -->

      <!-- Cookie Form -->
      <div class="login-wrapper" id="cookie-wrapper">

        <div class="login" id="cookie-form">
          <div class="content">
            <h1>We use cookies!</h1>

            <p class="input-label">We use cookies on PassX to save your username after you logged in once, so you don't have to enter it again. Also we do save your password length, to make the design of the login again field possible. If you want to use these two features, you have to press accept.</p>

            <div class="btn" onClick="acceptCookies()">
              <p>Accept</p>
              <span class="BorderTopBottom"></span>
              <span class="BorderLeftRight"></span>
            </div>
            <div class="btn" onClick="declineCookies()" style="margin-top: 30px;">
              <p>Decline</p>
              <span class="BorderTopBottom"></span>
              <span class="BorderLeftRight"></span>
            </div>
          </div>

        </div>

      </div>

      <!-- /Cookie Form\ -->

      <!-- Main Form -->

      <div class="wrapper" id="main-form">

        <div class="content">

          <div class="header">

            <input type="text" class="search-bar" name="search" placeholder="Filter" oninput="reloadPasswords()" id="search-bar" autofocus>

            <div class="add-btn" onClick="toggleCenteredPopUp('add-popup')"><a>+</a></div>
            <div class="add-btn" onClick="addContents()" id="reload-btn"><a>🗘</a></div>

            <div id="accountinfo" class="accountinfo" onClick="toggleDisplay('accountoptions');"><h1 id="accountinfo-name"></h1><i>▼</i></div>

            <div id="accountoptions" class="dropdown accountoptions">
                <ul>
                  <li><a onclick="openChangePassword()">Change Password</a></li>
                  <li><a onclick="openChangeEmail()">Change Email</a></li>
                  <li><hr></li>
                  <li><a onclick="logout()">Logout</a></li>
                </ul>
            </div>

          </div>

          <div class="passwords-wrapper" onscroll="hideDropdownMenus()" id="passwordsWrapper">
            <div class="big-add" id="emtyInfo">
              <h1>Seems a little bit emty</h1>
              <button onClick="toggleCenteredPopUp('add-popup')">Add Entry</button>
            </div>
            <table class="passwords" id="passwordTable">

            </table>
          </div>

          <div id="contextMenu" class="context-menu dropdown">
              <ul class="dropdownList">
                  <li><a onclick="copyUsername();hideDropdownMenus();">Copy Username</a></li>
                  <li><a onclick="copyPassword()">Copy Password</a></li>
                  <li><a onclick="openURL()">Open Website</a></li>
                  <li><a onclick="copyEmail()">Copy Email Address</a></li>
                  <li><hr></li>
                  <li><a onclick="toggleCenteredPopUp('add-popup')">Add Entry</a></li>
                  <li><a onclick="toggleCenteredPopUp('delete-popup')">Delete Entry</a></li>
                  <li class="last"><a onclick="openEditPopUp(clickedPasswordElement.id)">Show Entry</a></li>
              </ul>
          </div>


        </div>

      </div>

      <!-- /Main Form\ -->



    </div>

    <div id="notification-window" class="notification">
      <i onClick="closeNotificationPopUp()">x</i>
      <h1 id="notification-window-h1"></h1>
      <h2 id="notification-window-h2"></h2>
    </div>


    <div class="popup change-accountinfo-popup edit-popup" id="change-email">
      <h1>Change Email</h1>
      <hr>
      <div class="content">
        <input type="text" placeholder="New Email" id="change-email-input" class="maxLenghtFunction" maxlenght="40"><div class="icon" onClick="setNotificationPopUp('Email Info', 'The entered address neednt be your real email address. We only use this to contact you if something happend with your account')" title="The entered email address neednt be your real email address. We only use this to contact you if something happend with your account"><img src="assets/icons/info.png"></div>
        <button type="button" name="button" onClick="changeEmail()">Change</button>
        <button type="button" name="button" style="margin-top: 10px;" onClick="toggleCenteredPopUp('change-email')">Cancel</button>
      </div>
    </div>

    <div class="popup change-accountinfo-popup edit-popup" style="height:400px" id="change-password">
      <h1>Change Password</h1>
      <hr>
      <div class="content">
        <input type="password" placeholder="Old Password" id="change-password-old-input" class="maxLenghtFunction" maxlenght="50"><div class="icon" onClick="visibleChangePasswordOld()"><img src="assets/icons/visible.png" id="visibility-btn-change-pswd-old"></div>
        <input type="password" placeholder="New Password" id="change-password-input" class="maxLenghtFunction" maxlenght="50"><div class="icon visibility left" onClick="visibleChangePasswordInput()"><img src="assets/icons/visible.png" id="visibility-btn-change-pswd"></div><div class="icon" onClick="setNotificationPopUp('Password Info', 'Your password is not going to be saved anywhere. It is only used as key to encrypt your password entries. This means, there is no possibility to reset your password if you forget it.')" title="Your password is not going to be saved anywhere. It's only used as key to encrypt your password entries. This means, there's no possibility to reset your password if you forget it."><img src="assets/icons/info.png"></div>
        <input type="password" placeholder="Repeat New Password" id="change-password-repeat-input" class="maxLenghtFunction" maxlenght="50">
        <button type="button" name="button" onClick="changePassword()">Change</button>
        <button type="button" name="button" style="margin-top: 10px;" onClick="toggleCenteredPopUp('change-password')">Cancel</button>
      </div>
    </div>

    <div class="popup add-popup" id="add-popup">
      <h1>Add Entry</h1>
      <hr>
      <div class="content">
        <input type="text" placeholder="Title" id="add-title" class="maxLenghtFunction" maxlenght="50">
        <input type="text" placeholder="Username" id="add-username" class="maxLenghtFunction" maxlenght="50">
        <input type="email" placeholder="Email" id="add-email" class="maxLenghtFunction" maxlenght="50">
        <input type="url" placeholder="Website" id="add-website" class="maxLenghtFunction" maxlenght="50">
        <input type="password" placeholder="Password" id="add-password" class="maxLenghtFunction password-input" maxlenght="50"><div class="icon" onClick="visiblePassword()"><img src="assets/icons/visible.png" class="visibility-btn" id="visibility-btn"></div>
        <input type="password" placeholder="Repeat Password" id="add-repeatpassword" class="maxLenghtFunction password-input" maxlenght="50">
        <textarea placeholder="Description" rows="8" cols="80" id="add-description" class="maxLenghtFunction" maxlenght="100"></textarea>
        <button type="button" name="button" onClick="addPassword()">Add</button>
        <button type="button" name="button" style="margin-top: 10px;" onClick="toggleCenteredPopUp('add-popup')">Cancel</button>
      </div>
    </div>

    <div class="popup question-popup" id="delete-popup">
      <h1>Delete Entry</h1>
      <hr>
      <div class="content">
        <h1>Are you sure, that you want to delete this entry?</h1>
        <button type="button" name="button" onClick="deletePassword()">Yes, Delete!</button>
        <button type="button" name="button" style="margin-top: 10px;" onClick="toggleCenteredPopUp('delete-popup')">Cancel</button>
      </div>
    </div>

    <div class="popup question-popup" id="invalidsession-popup">
      <h1>Invalid Session</h1>
      <hr>
      <div class="content">
        <h2 id="invalidsession-popup-error" style="text-align: center;"></h2>
        <button type="button" name="button" onClick="location.reload(true);">Login again</button>
        <button type="button" name="button" onClick="logout()">Logout</button>
      </div>
    </div>


    <div class="popup edit-popup" id="edit-popup">
      <h1>Edit Entry</h1>
      <hr>
      <div class="content" id="edit-popup-content">
        <input type="text" placeholder="Title" class="maxLenghtFunction" maxlenght="50">
        <input type="text" placeholder="Username" class="maxLenghtFunction" maxlenght="50"><div class="icon" onClick="copyUsername()"><img src="assets/icons/copy.png"></div>
        <input type="email" placeholder="Email" class="maxLenghtFunction" maxlenght="50"><div class="icon" onClick="copyEmail()"><img src="assets/icons/copy.png"></div>
        <input type="url" placeholder="Website" class="maxLenghtFunction" maxlenght="50"><div class="icon" onClick="copyURL()"><img src="assets/icons/copy.png"></div><div class="icon left" onClick="openURL()"><img src="assets/icons/open.png"></div>
        <input type="password" placeholder="Password" id="edit-password" class="maxLenghtFunction password-input" maxlenght="50"><div class="icon left" onClick="visiblePassword()"><img src="assets/icons/visible.png" class="visibility-btn"></div><div class="icon" onClick="copyPassword()"><img src="assets/icons/copy.png"></div>
        <textarea placeholder="Description" rows="8" cols="80" class="maxLenghtFunction" maxlenght="100"></textarea>
        <button type="button" name="button" onClick="saveEditPopUp()">Save</button>
        <button type="button" name="button" style="margin-top: 10px;" onClick="closeEditPopUp()">Cancel</button>
      </div>
    </div>
    <div class="background-black" id="background-black"></div>

  </body>

  <script src="scripts/js/aes/cryptojs-aes.min.js"></script>
  <script src="scripts/js/aes/cryptojs-aes-format.js"></script>
  <script src="scripts/js/aes.js"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


  <script src="scripts/js/frontend.js"></script>
  <script src="scripts/js/stringutils.js"></script>
  <script src="scripts/js/apicommunication.js"></script>
  <script src="scripts/js/dropdown.js"></script>
  <script src="scripts/js/maxlenghtfunction.js"></script>

  <script type="text/javascript">

    function openCookie() {
      document.getElementById("login-wrapper").classList.add("hidden");
      setTimeout(function() {
        document.getElementById("login-form").style.display = "none";
      }, 1000);
      document.getElementById("main-form").style.display = "none";
      document.getElementById("cookie-wrapper").style.display = "block";
    }

    function openMain() {
      document.getElementById("main-form").style.display = "flex";
      document.getElementById("login-wrapper").classList.add("hidden");
      setTimeout(function() {
        document.getElementById("login-form").style.display = "none";
      }, 1000);
    }

    function openLoginAgain() {
      document.getElementById("login-wrapper").style.display = "none";
      document.getElementById("login-again-wrapper").classList.add("visible");
      var contents = document.cookie.split(",");
      document.getElementById("login-again-title").innerHTML = "Welcome Back " + contents[0] + "!";
      setupLoginAgainInputs(contents[1]);
    }
    if(document.cookie != "") {
      openLoginAgain();
    }

    function openRegister() {
      document.getElementById("login-form").classList.add("top");
    }
    function openLogin() {
      document.getElementById("login-form").classList.remove("top");
    }
    function toggleLoginPassword() {
      if(document.getElementById("login-password-icon").src.includes("assets/icons/visible.png")) {
        document.getElementById("login-password-icon").src = "assets/icons/invisible.png";
        document.getElementById("login-password").type = "text";
      }else {
        document.getElementById("login-password-icon").src = "assets/icons/visible.png";
        document.getElementById("login-password").type = "password";
      }
    }
    function toggleRegisterPassword() {
      if(document.getElementById("register-password-icon").src.includes("assets/icons/visible.png")) {
        document.getElementById("register-password-icon").src = "assets/icons/invisible.png";
        document.getElementById("register-password").type = "text";
        document.getElementById("register-repeatpassword").type = "text";
      }else {
        document.getElementById("register-password-icon").src = "assets/icons/visible.png";
        document.getElementById("register-password").type = "password";
        document.getElementById("register-repeatpassword").type = "password";
      }
    }
  </script>
</html>
