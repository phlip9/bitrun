var REDIRECT_URI = encodeURIComponent("https://bitrunapp.herokuapp.com");
var CLIENT_ID = "68cfc8c475c6730bd046e4da8039a76edfa76f913bf58d7d0ddaffe937360139";
var CLIENT_SECRET = "d376095308bb244127abfa069cb9aff9787f5542238051b9e3d67cbf0fa2477d";
var AUTHORIZE_URI = "https://www.coinbase.com/oauth/authorize"
var ACCESS_TOKEN_URI = "https://www.coinbase.com/oauth/token"

var auth_uri = AUTHORIZE_URI + "?response_type=code" + "&client_id=" +
          CLIENT_ID + "&redirect_uri=" + REDIRECT_URI;

window.redirectToCoinBase = function () {
  this.location.assign(auth_uri);
};

window.isUserLoggedIn = function (cb) {
  var flag = String(this.location).indexOf("?code=");
  if (flag !== -1) {
    var code = String(this.location).slice(flag + 6);
    var token_uri = ACCESS_TOKEN_URI + "?grant_type=authorization_code&code=" +
                    code + "&redirect_uri=" + REDIRECT_URI + "&client_id=" +
                    CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
    console.log(code);
    console.log(token_uri);
    $.post("https://bitrunapp.herokuapp.com/oauth", {uri:token_uri})
     .done(function (data) {
       console.log("Success! %s", JSON.stringify(data));
       if (cb) cb(null, data);
     })
     .fail(function (err) {
       if (cb) cb(err);
     });
   } else {
     if (cb) cb();
   }
};

//https://www.coinbase.com/oauth/authorize?grant_type=authorization_code&code=05cded88ff915bb76ae0b109b78ce9d98cd0d8050c34c565188cddb4b7c05cda&redirect_uri=https://bitrunapp.herokuapp.com&client_id=68cfc8c475c6730bd046e4da8039a76edfa76f913bf58d7d0ddaffe937360139&client_secret=d376095308bb244127abfa069cb9aff9787f5542238051b9e3d67cbf0fa2477d
