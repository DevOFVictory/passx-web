function encrypt(message = '', key = ''){
  var message = CryptoJSAesJson.encrypt(message, key);
  return message.toString();
}

function decrypt(message = '', key = ''){
  var code = CryptoJSAesJson.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}
