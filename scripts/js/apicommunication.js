//** Link **\\
var apiVersion = 1.4;
function getApiURL(fileName) {
  return "https://api.cuodex.net/passx/v" + apiVersion + "/" + fileName + ".php";
}
function internalServerError() {
  window.location.href= "https://cuodex.net/en/error/?exit_code=500";
}

//** Change Account Information **\\

function checkSessionid() {
  $.ajax({
    url: getApiURL("checksessionid"),
    method: "POST",
    data: {
      username: username,
      sessionid: sessionID
    },
    success: function(response) {
      if(!response.success) {
        password = ""
        toggleCenteredPopUp("invalidsession-popup");
        document.getElementById("invalidsession-popup-error").innerHTML = response.error;
      }
    },
    error: function(response) {
      internalServerError();
    }
  });
  setTimeout(checkSessionid, 30* 1000);
}

function openChangePassword() {
  openCenteredPopUp("change-password");
  document.getElementById("change-password-input").value = "";
  document.getElementById("change-password-repeat-input").value = "";
  document.getElementById("change-password-old-input").value = "";
}

function changePassword() {
  closeCenteredPopUp("change-password");
  if(document.getElementById("change-password-input").value == document.getElementById("change-password-repeat-input").value) {
    $.ajax({
      url: getApiURL("changepassword"),
      method: "POST",
      data: {
        accountname: username,
        sessionID: sessionID,
        password: document.getElementById("change-password-old-input").value,
        newPassword: document.getElementById("change-password-input").value,
        newPasswordTest: encrypt("encryptionTest", document.getElementById("change-password-input").value)
      },
      success: function(response) {
        if(response.success) {
          password = document.getElementById("change-password-input").value;
          document.cookie = username + "," + password.length;
          setNotificationPopUp("Password Changed", "You successfully changed your password");
        }else {
          setNotificationPopUp("Error", response.error);
        }
      },
      error: function(response) {
        internalServerError();
      }
    });
  }else {
    setNotificationPopUp("Error", "Your entered passwords don't match");
  }
}

function openChangeEmail() {
  openCenteredPopUp("change-email");
  document.getElementById("change-email-input").value = email;
}

function changeEmail() {
  closeCenteredPopUp("change-email");
  var newEmail = document.getElementById("change-email-input").value;
  if(newEmail != email) {
    $.ajax({
      url: getApiURL("changeemail"),
      method: "POST",
      data: {
        accountname: username,
        sessionID: sessionID,
        newEmail: newEmail
      },
      success: function(response) {
        if(response.success) {
          setNotificationPopUp("Email Address Changed", "You successfully changed your email address from <b>" + email + "</b> to <b>" + newEmail + "</b>");
          email = newEmail;
        }else {
          setNotificationPopUp("Error", response.error);
        }
      },
      error: function(response) {
        internalServerError();
      }
    });
  }
}

//** Password List Communication **\\
var clickedPasswordElement;

var passwords = [];

var currentEditId = 0;

function saveEditPopUp() {
  var content = document.getElementById("edit-popup-content");
  console.log(content.childNodes[13].value);
  $.ajax({
    url : getApiURL("changeentry"),
    method: "POST",
    data: {
      accountname: username,
      id: passwords[currentEditId][6],
      sessionID: sessionID,
      username: encrypt(content.childNodes[3].value, password),
      password: encrypt(content.childNodes[13].value, password),
      description: encrypt(content.childNodes[17].value, password),
      url: encrypt(content.childNodes[9].value, password),
      email: encrypt(content.childNodes[6].value, password),
      title: encrypt(content.childNodes[1].value, password)
    },
    success: function(response)
    {
      if(response.success) {
        closeEditPopUp();
        addContents();
      }else {
        setNotificationPopUp("Error", response.error);
      }

    },
    error: function (response)
    {
      internalServerError();
    }
  });
}

function openEditPopUp(id) {
  currentEditId = id;
  clickedPasswordElement = document.getElementById(id);
  var entryContent = passwords[id];
  var content = document.getElementById("edit-popup-content");
  document.getElementById("visibility-btn").src = "assets/icons/visible.png";
  document.getElementById("edit-password").type = "password";
  content.childNodes[1].value = entryContent[0];
  content.childNodes[3].value = entryContent[1];
  content.childNodes[6].value = entryContent[3];
  content.childNodes[9].value = entryContent[5];
  content.childNodes[13].value = entryContent[2];
  content.childNodes[17].value = entryContent[4];
  openCenteredPopUp("edit-popup");
}

function closeEditPopUp() {
  closeCenteredPopUp("edit-popup");
  var content = document.getElementById("edit-popup-content");
  content.childNodes[1].value = "";
  content.childNodes[3].value = "";
  content.childNodes[6].value = "";
  content.childNodes[9].value = "";
  content.childNodes[13].value = "";
}

function addPassword() {
  if(document.getElementById("add-password").value == document.getElementById("add-repeatpassword").value) {
    $.ajax({
      url : getApiURL("addentry"),
      method: "POST",
      data : {
        accountname: username,
        sessionID: sessionID,
        username: encrypt(document.getElementById("add-username").value, password),
        password: encrypt(document.getElementById("add-password").value, password),
        description: encrypt(document.getElementById("add-description").value, password),
        email: encrypt(document.getElementById("add-email").value, password),
        url: encrypt(document.getElementById("add-website").value, password),
        title: encrypt(document.getElementById("add-title").value, password)
      },
      success: function(response)
      {
        if(response.success) {
          toggleCenteredPopUp('add-popup');
          addContents();
        }else {
          setNotificationPopUp("Error", response.error);
        }

      },
      error: function (response)
      {
        internalServerError();
      }
    });
  }else {
    setNotificationPopUp("Error", "The entered passwords do not match");
  }
}

function deletePassword() {
  $.ajax({
    url : getApiURL("deleteentry"),
    method: "POST",
    data : {
      username: username,
      sessionID: sessionID,
      passwordID: passwords[clickedPasswordElement.id][6]
    },
    success: function(response)
    {
      passwords = [];
      if(response.success) {
        addContents();
        closeCenteredPopUp("delete-popup");
      }else {
        setNotificationPopUp("Error", response.error);
      }
    },
    error: function (response)
    {
      internalServerError();
    }
  });
}

function addContents() {
  document.getElementById("accountinfo-name").innerHTML = username;
  $.ajax({
    url : getApiURL("getpasswords"),
    method: "POST",
    data : {
      username: username,
      sessionID: sessionID
    },
    success: function(response)
    {
      passwords = [];
      if(response.success) {
        setTimeout(checkSessionid, 1000*30);
        for(var index in response.passwords) {
          var e = response.passwords[index];
          passwords.push([cleanString(decrypt(e.title, password)), cleanString(decrypt(e.username, password)), decrypt(e.password, password), cleanString(decrypt(e.email, password)), cleanString(decrypt(e.description, password)), cleanString(decrypt(e.url, password)), e.id]);
        }
        reloadPasswords();
      }else {
        setNotificationPopUp("Error", response.error + "tes");
      }

    },
    error: function (response)
    {
      internalServerError();
    }
  });
}

function reloadPasswords() {
  var passwordTable = document.getElementById("passwordTable");
  if(passwords != "") {
    var searchContent = document.getElementById("search-bar").value;
    passwordTable.innerHTML = "<tr class='title'><th>Title</th><th>Username</th><th>Password</th><th>Email</th><th>URL</th><th>Description</th></tr>";
    for(var arrayIndex in passwords) {
      if(passwords[arrayIndex][0].toLowerCase().includes(searchContent.toLowerCase()) ||
         passwords[arrayIndex][1].toLowerCase().includes(searchContent.toLowerCase()) ||
         passwords[arrayIndex][3].toLowerCase().includes(searchContent.toLowerCase()) ||
         passwords[arrayIndex][4].toLowerCase().includes(searchContent.toLowerCase()) ||
         passwords[arrayIndex][5].toLowerCase().includes(searchContent.toLowerCase())) {
        var description = passwords[arrayIndex][4];
        if(description.length > 20) {
          description = description.slice(0, 20) + "...";
        }
        var title = passwords[arrayIndex][0];
        if(title.length > 13) {
          title = title.slice(0, 13) + "...";
        }
        passwordTable.innerHTML += "<tr id='" + arrayIndex + "' onclick='openEditPopUp(" + arrayIndex + ")'><th>" + title + "</th><th>" + passwords[arrayIndex][1] + "</th><th>" + displayPassword(passwords[arrayIndex][2]) + "</th><th>" + passwords[arrayIndex][3] + "</th><th>" + passwords[arrayIndex][5] + "</th><th>" + description + "</th></tr>";
      }
    }
    document.getElementById("emtyInfo").style.display = "none";
  }else {
    passwordTable.innerHTML = "";
    document.getElementById("emtyInfo").style.display = "block";
  }

}

function isOnPasswordElement(x, y) {
  var searchContent = document.getElementById("search-bar").value;
  var passwordTable = document.getElementById("passwordTable");
  for(var arrayIndex in passwords) {
    if(passwords[arrayIndex][0].toLowerCase().includes(searchContent.toLowerCase()) ||
       passwords[arrayIndex][1].toLowerCase().includes(searchContent.toLowerCase()) ||
       passwords[arrayIndex][3].toLowerCase().includes(searchContent.toLowerCase()) ||
       passwords[arrayIndex][4].toLowerCase().includes(searchContent.toLowerCase())) {
         var current = document.getElementById(arrayIndex);
         var wrapper = document.getElementById("passwordsWrapper");
         if(x >= wrapper.getBoundingClientRect().left && x <= wrapper.getBoundingClientRect().left + wrapper.offsetWidth && y >= wrapper.getBoundingClientRect().top && y <= wrapper.getBoundingClientRect().top + wrapper.offsetHeight) {
           if(x >= current.getBoundingClientRect().left && x <= current.getBoundingClientRect().left + current.offsetWidth && y >= current.getBoundingClientRect().top && y <= current.getBoundingClientRect().top + current.offsetHeight) {
             clickedPasswordElement = current;
             return true;
           }
         }
    }
  }
  return false;
}

reloadPasswords();


function copyUsername() {
  var content = clickedPasswordElement.childNodes[1].innerHTML;
  navigator.clipboard.writeText(content);
  setNotificationPopUp("Copied Username", "You successfully copied the Username: <b>" + content + "</b>");
  forceHideDropdownMenus();
}
function copyEmail() {
  var content = clickedPasswordElement.childNodes[3].innerHTML;
  navigator.clipboard.writeText(content);
  setNotificationPopUp("Copied Email", "You successfully copied the Email: <b>" + content + "</b>");
  forceHideDropdownMenus();
}
function copyURL() {
  var content = passwords[clickedPasswordElement.id][4].innerHTML;
  navigator.clipboard.writeText(content);
  setNotificationPopUp("Copied Website", "You successfully copied the URL: <b>" + content + "</b>");
  forceHideDropdownMenus();
}
function openURL() {
  var content = passwords[clickedPasswordElement.id][5];
  window.open(content, '_blank');
}
function copyPassword() {
  var content = passwords[clickedPasswordElement.id][2];
  navigator.clipboard.writeText(content);
  setNotificationPopUp("Copied Password", "You successfully copied your Password: <b>" + displayPassword(content) + "</b>");
  forceHideDropdownMenus();
}
function visiblePassword() {
  var els = document.getElementsByClassName("visibility-btn");
  for(var i = 0; i < els.length; i++)
  {
    if(els[i].src.includes("assets/icons/visible.png")) {
      els[i].src = "assets/icons/invisible.png";
      var inputs = document.getElementsByClassName("password-input");
      for(var y = 0; y < inputs.length; y++)
      {
        inputs[y].type = "text";
      }
    }else {
      els[i].src = "assets/icons/visible.png";
      var inputs = document.getElementsByClassName("password-input");
      for(var y = 0; y < inputs.length; y++)
      {
        inputs[y].type = "password";
      }
    }
  }
}
function visibleChangePasswordOld() {
  if(document.getElementById("visibility-btn-change-pswd-old").src.includes("assets/icons/visible.png")) {
    document.getElementById("visibility-btn-change-pswd-old").src = "assets/icons/invisible.png";
    document.getElementById("change-password-old-input").type = "text";
  }else {
    document.getElementById("visibility-btn-change-pswd-old").src = "assets/icons/visible.png";
    document.getElementById("change-password-old-input").type = "password";
  }
}
function visibleChangePasswordInput() {
  if(document.getElementById("visibility-btn-change-pswd").src.includes("assets/icons/visible.png")) {
    document.getElementById("visibility-btn-change-pswd").src = "assets/icons/invisible.png";
    document.getElementById("change-password-input").type = "text";
    document.getElementById("change-password-repeat-input").type = "text";
  }else {
    document.getElementById("visibility-btn-change-pswd").src = "assets/icons/visible.png";
    document.getElementById("change-password-input").type = "password";
    document.getElementById("change-password-repeat-input").type = "password";
  }
}


//** Login Communication **\\
var password, username, email, sessionID;

document.getElementById("login-password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    checkIfLoginErrorAnOpenCookie();
  }
});
document.getElementById("login-username").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    checkIfLoginErrorAnOpenCookie();
  }
});

function logout() {
  document.cookie = "";
  location.reload(true);
}

var loginCount = 0;

var canLogin = true;
function loginAgain() {
  if(loginCount <= 15) {
    if(canLogin) {
      canLogin = false;
      var passwordEntry = "";
      for(var i = 0; i < document.getElementById("login-again-passwords").children.length; i++) {
        passwordEntry += document.getElementById("login-again-passwords").children[i].children[0].value;
      }
      var cookieUsername = document.cookie.split(",")[0];
      $.ajax({
        url : getApiURL("checkuser"),
        method: "POST",
        data : {
          username: cookieUsername,
          password: passwordEntry
        },
        success: function(response)
        {
          loginCount += 1;
          if(response.success) {
            var passwordTest = response.passwordTest;
            if(decrypt(passwordTest, passwordEntry) == "encryptionTest") {
              password = passwordEntry;
              username = cookieUsername;
              sessionID = response.sessionID;
              email = response.email;
              if(cookies) {
                document.cookie = username + "," + password.length;
              }
              for(var i = 0; i < document.getElementById("login-again-passwords").children.length; i++) {
                document.getElementById("login-again-passwords").children[i].style.animation = "5s login-again-entry-hide";
                document.getElementById("login-again-passwords").children[i].style.animationDelay = (i*0.05) + "s";
              }
              setTimeout(function() {
                document.getElementById("login-again-wrapper").classList.add("hidden");
                openMain();
                closeCookie();
                setTimeout(function() {
                  canLogin = true;
                  document.getElementById("login-again-wrapper").style.display = "none";
                }, 100);
              }, document.getElementById("login-again-passwords").children.length*0.05*1000);
              addContents();
            }else {
              canLogin = true;
              setNotificationPopUp("Error", "You're entered password is wrong");
            }
          }else {
            if(response.errorID == 1) {

            }else {
              setNotificationPopUp("Error", response.error);
            }
            for(var i = 0; i < document.getElementById("login-again-passwords").children.length; i++) {
              document.getElementById("login-again-passwords").children[i].children[0].value = "";
            }
            document.getElementById("login-again-passwords").children[0].children[0].focus();
            document.getElementById("login-again-passwords").children[0].style.marginLeft = "-30px";
            setTimeout(function() {
              document.getElementById("login-again-passwords").children[0].style.marginLeft = "0px";
              canLogin = true;
            }, 300);

          }

        },
        error: function (response) {
          internalServerError();
        }
      });
    }
  }else {
    setNotificationPopUp("Error", "You have sent to many login requests. Please reload the page!");
  }
}

function checkIfLoginErrorAnOpenCookie() {
  if(loginCount <= 15) {
    if(document.getElementById("login-username").value != "" && document.getElementById("login-password").value != "") {
      $.ajax({
        url : getApiURL("checkuser"),
        method: "POST",
        data : {
          username: document.getElementById("login-username").value,
          password: document.getElementById("login-password").value
        },
        success: function(response)
        {
          loginCount += 1;
          if(response.success) {
            var passwordTest = response.passwordTest;
            if(decrypt(passwordTest, document.getElementById("login-password").value) == "encryptionTest") {
              openCookie();
            }else {
              document.getElementById("login-error").innerHTML = "You entered the wrong password";
            }
          }else {
            document.getElementById("login-error").innerHTML = response.error;
          }

        },
        error: function (response) {
          internalServerError();
        }
      });
    }else {
      document.getElementById("login-error").innerHTML = "Please fill in all fields";
    }
  }else {
    document.getElementById("login-error").innerHTML = "You have sent to many login requests. Please reload the page!";
  }
}

function login() {
  if(loginCount <= 15) {
    if(document.getElementById("login-username").value != "" && document.getElementById("login-password").value != "") {
      $.ajax({
        url : getApiURL("checkuser"),
        method: "POST",
        data : {
          username: document.getElementById("login-username").value,
          password: document.getElementById("login-password").value
        },
        success: function(response)
        {
          loginCount += 1;
          if(response.success) {
            var passwordTest = response.passwordTest;
            if(decrypt(passwordTest, document.getElementById("login-password").value) == "encryptionTest") {
              document.getElementById("login-error").innerHTML = "";
              password = document.getElementById("login-password").value;
              username = document.getElementById("login-username").value;
              sessionID = response.sessionID;
              email = response.email;
              if(cookies) {
                document.cookie = username + "," + password.length;
              }
              addContents();
              openMain();
              closeCookie();
            }else {
              document.getElementById("login-error").innerHTML = "You entered the wrong password";
            }
          }else {
            document.getElementById("login-error").innerHTML = response.error;
          }

        },
        error: function (response) {
          internalServerError();
        }
      });
    }else {
      document.getElementById("login-error").innerHTML = "Please fill in all fields";
    }
  }else {
    document.getElementById("login-error").innerHTML = "You have sent to many login requests. Please reload the page!";
  }
}

document.getElementById("register-password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    register();
  }
});
document.getElementById("register-username").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    register();
  }
});
document.getElementById("register-repeatpassword").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    register();
  }
});
document.getElementById("register-email").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    register();
  }
});

function containsUpperCase(str) {
  for (var i = 0; i < str.length; i++) {
    if(!/\d/.test(str.charAt(i))) {
      if(str.charAt(i) == str.charAt(i).toUpperCase()) {
        return true;
      }
    }
  }
  return false;
}

function containsLowerCase(str) {
  for (var i = 0; i < str.length; i++) {
    if(!(/\d/.test(str.charAt(i)))) {
      if(str.charAt(i) == str.charAt(i).toLowerCase()) {
        return true;
      }
    }

  }
  return false;
}

function register() {
  var passwdInput = document.getElementById("register-password").value;
  var errorObj = document.getElementById("register-error");
  if(document.getElementById("register-username").value != "" && document.getElementById("register-email").value != "" && passwdInput != "" && document.getElementById("register-repeatpassword").value != "") {
    if(passwdInput == document.getElementById("register-repeatpassword").value) {
      if(passwdInput.length > 9) {
        if(containsUpperCase(passwdInput) == true) {
          if(containsLowerCase(passwdInput) == true) {
            if(/\d/.test(passwdInput)) {
              $.ajax({
                url : getApiURL("createuser"),
                method: "POST",
                data : {
                  username: document.getElementById("register-username").value,
                  email: document.getElementById("register-email").value,
                  passwordTest: encrypt("encryptionTest", document.getElementById("register-password").value)
                },
                success: function(response)
                {
                  if(response.success) {
                    errorObj.innerHTML = "";
                    openLogin();
                  }else {
                    errorObj.innerHTML = response.error;
                  }

                },
                error: function (response)
                {
                  internalServerError();
                }
              });
          }else {
            errorObj.innerHTML = "Your password must contain at least 1 number";
          }
        }else {
          errorObj.innerHTML = "Your password must contain at least 1 lowercase character";
        }

        }else {
          errorObj.innerHTML = "Your password must contain at least 1 uppercase character";
        }
      }else {
        errorObj.innerHTML = "Your password must be at least 10 characters long";
      }

    }else {
      errorObj.innerHTML = "Your entered passwords don't match";
    }
  }else {
    document.getElementById("register-error").innerHTML = "Please fill in all fields";
  }

}

var cookies = false;

function acceptCookies() {
  cookies = true;
  login();
}

function declineCookies() {
  cookies = false;
  login();
}
