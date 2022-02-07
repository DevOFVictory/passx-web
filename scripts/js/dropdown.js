document.onmousedown = hideDropdownMenus;
document.oncontextmenu = (e) => rightClick(e);

var inDropDown = false;


var mouseX, mouseY;

document.addEventListener("mousemove", () => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function inDropdownMenu() {
  var dropdowns = document.getElementsByClassName("dropdown");
  for (i = 0; i < dropdowns.length; i++) {
    var divRect = dropdowns[i].getBoundingClientRect();
    if (mouseX >= divRect.left && mouseX <= divRect.right &&
      mouseY >= divRect.top && mouseY <= divRect.bottom) {
      return true;
    }
  }
  return false;

}

function hideDropdownMenus() {
  if(!inDropdownMenu()) {
    forceHideDropdownMenus();
  }
}

function forceHideDropdownMenus() {
  var dropdowns = document.getElementsByClassName("dropdown");
  for (i = 0; i < dropdowns.length; i++) {
    if(dropdowns[i].style.display != "none") {
      dropdowns[i].style.display = "none";
    }
  }
}



function rightClick(e) {

  if(isOnPasswordElement(e.pageX, e.pageY) && !isBlackBackground()) {
    e.preventDefault();

    var menu = document.getElementById("contextMenu");

    menu.style.display = 'block';
    menu.style.left = (e.pageX + 5) + "px";
    menu.style.top = (e.pageY + 5) + "px";
  }else {
    hideDropdownMenus();
  }
}

function isContextmenuOpen() {
  return document.getElementById("contextMenu").style.display != "none";
}
