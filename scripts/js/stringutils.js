var possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?=@-_\/(){}[]:"

function cleanString(input) {
  var output = "";
  Array.from(input).forEach((e, i) => {
    Array.from(possibleChars).forEach((f, y) => {
      if(f == e) {
        output += e;
      }
    });
  });
  return output;
}
