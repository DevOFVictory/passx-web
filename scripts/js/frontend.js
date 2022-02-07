//** General **\\
function toggleDisplay(elementId) {
  document.getElementById(elementId).style.display = document.getElementById(elementId).style.display == "block" ? "none" : "block";
}
function disableDisplay(elementId) {
  document.getElementById(elementId).style.display = "none";
}
function enableDisplay(elementId) {
  document.getElementById(elementId).style.display = "block";
}
function displayPassword(clear) {
  var output = "";
  for (var i = 0; i < clear.length; i++) {
    output += "•";
  }
  return output;
}

/*window.addEventListener("resize", function() {
  var margin = (window.outerWidth-document.cookie.split(",")[1] * (100+20))/2;
  document.getElementById("login-again-passwords").style.marginLeft = margin + "px";
  if(margin < 0) {
    document.getElementById("login-again-passwords").innerHTML = '<div class="login-again-passwords-entry"><input type="password" onkeypress="checkLoginAgainMobile()" autocomplete="off"></div>';
    document.getElementById("login-again-passwords").classList.add("mobile");
  }else {
    setupLoginAgainInputs(document.cookie.split(",")[1]);
  }
});*/

function checkLoginAgainMobile() {
  if(document.getElementById("login-again-passwords").children[0].children[0].value.length+1 == document.cookie.split(",")[1]) {
    setTimeout(loginAgain, 100);
  }
}

function setupLoginAgainInputs(length) {
  var margin = (window.outerWidth-length * (100+20))/2;
  document.getElementById("login-again-passwords").innerHTML = '';
  if(margin < 130) {
    document.getElementById("login-again-passwords").innerHTML = '<div class="login-again-passwords-entry"><input type="password" onkeypress="checkLoginAgainMobile()" autocomplete="off"></div>';
    document.getElementById("login-again-passwords").classList.add("mobile");
  }else {
    for(var i = 0; i < length-1; i++) {
      document.getElementById("login-again-passwords").innerHTML += '<div class="login-again-passwords-entry"><input type="password" autocomplete="off" onfocus="clearLoginAgainField(' + i + ')" onkeypress="focusLoginAgainInputField(' + (i+1) + ')"></div>';
    }
    document.getElementById("login-again-passwords").innerHTML += '<div class="login-again-passwords-entry"><input type="password" autocomplete="off" onfocus="clearLoginAgainField(' + i + ')" onkeypress="setTimeout(loginAgain, 500)"></div>';
    document.getElementById("login-again-passwords").style.marginLeft = margin + "px";
  }
  document.getElementById("login-again-passwords").children[0].children[0].focus();

}

function clearLoginAgainField(childNumber) {
  document.getElementById('login-again-passwords').children[childNumber].children[0].value = "";
}

function focusLoginAgainInputField(childNumber) {
  setTimeout(function() {
    document.getElementById('login-again-passwords').children[childNumber].children[0].focus();
  }, 1);

}

//** Keys **\\
var TABKEY = 9, ESCKEY = 27;

//** Input Tabulator Key **\\

document.addEventListener('keyup', function(e) {
  var elements = document.getElementsByClassName("capslock-icon");
  for (i = 0; i < elements.length; i++) {
    if(e.getModifierState("CapsLock")) {
      elements[i].style.display = "block";
    }else {
      elements[i].style.display = "none";
    }
  }
});

document.getElementById("login-password").addEventListener('keydown', function(e) {
  if(e.keyCode == TABKEY) {
    openRegister();
    e.preventDefault();
    document.getElementById("register-username").focus();
    return false;
  }
});

document.getElementById("login-password").addEventListener('keyup', function(e) {
  if(e.keyCode == TABKEY) {
    openLogin();
    e.preventDefault();
    document.getElementById("login-password").focus();
    return false;
  }
});

//** Centered Pop Ups **\\

function isBlackBackground() {
  return document.getElementById("background-black").classList.contains("visible");
}

function toggleCenteredPopUp(id) {
  isCenteredPopUp(id) ? closeCenteredPopUp(id) : openCenteredPopUp(id);
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === ESCKEY);
    }
    if (isEscape) {
        closeCenteredPopUp(currentCenteredPopUp);
    }
};

var currentCenteredPopUp = "";

function openCenteredPopUp(id) {
  forceHideDropdownMenus();
  currentCenteredPopUp = id;
  enableDisplay("background-black");
  enableDisplay(id);
  setTimeout(function() {
    document.getElementById(id).classList.toggle("visible");
    document.getElementById("background-black").classList.toggle("visible");
  }, 10);
  var els = document.getElementsByClassName("visibility-btn");
  for(var i = 0; i < els.length; i++)
  {
    els[i].src = "assets/icons/visible.png";
  }
}

function closeCenteredPopUp(id) {
  setTimeout(function() {
    disableDisplay("background-black");
    disableDisplay(id);
  }, 500);
  document.getElementById(id).classList.toggle("visible");
  document.getElementById("background-black").classList.toggle("visible");
}

function isCenteredPopUp(id) {
  return document.getElementById(id).classList.contains("visible");
}

//** Notification PopUp **\\
function toggleNotificationPopUp() {
  document.getElementById("notification-window").classList.toggle("visible");
}
function closeNotificationPopUp() {
  document.getElementById("notification-window").classList.remove("visible");
}
function setNotificationPopUp(h1, h2) {
  document.getElementById("notification-window-h1").innerHTML = h1;
  document.getElementById("notification-window-h2").innerHTML = h2;
  if(!document.getElementById("notification-window").classList.contains("visible")) {
    toggleNotificationPopUp();
  }
}


function closeCookie() {
  document.getElementById("cookie-wrapper").style.opacity = 0;
  setTimeout(function() {
    document.getElementById("cookie-wrapper").style.display = "none";
  }, 500);
}
