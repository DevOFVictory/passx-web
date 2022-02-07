var elements = document.getElementsByClassName('maxLenghtFunction');
for (var i = 0; i < elements.length; ++i) {
    var item = elements[i];
    var maxLenght = item.getAttribute("maxLenght");
    if(maxLenght > 0) {
      item.addEventListener("keypress", function(e) {
        var item = e.target;
        var maxLenght = e.target.getAttribute("maxlenght");
        if(item.value.length >= maxLenght) {
          e.preventDefault();
        }
      });
    }
}
