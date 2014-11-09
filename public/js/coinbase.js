var REDIRECT_URI = "https://bitrunapp.herokuapp.com";
var CLIENT_ID = "68cfc8c475c6730bd046e4da8039a76edfa76f913bf58d7d0ddaffe937360139";
var CLIENT_SECRET = "d376095308bb244127abfa069cb9aff9787f5542238051b9e3d67cbf0fa2477d";
var AUTHORIZE_URI = "https://www.coinbase.com/oauth/authorize"
var ACCESS_TOKEN_URI = "https://www.coinbase.com/oauth/token"

var auth_uri = AUTHORIZE_URI + "?response_type=code" + "&client_id=" +
          CLIENT_ID + "&redirect_uri=" + REDIRECT_URI;

window.redirectToCoinBase = function () {
  this.location.assign(auth_uri);
};

window.isUserLoggedIn = function () {
  var flag = this.location.indexOf("?code=");
  if (flag !== -1) {
    var code = this.location.slice(flag + 6);
    var token_uri = ACCESS_TOKEN_URI + "?grant_type=authorization_code&code=" +
                    code + "&redirect_uri=" + REDIRECT_URI + "&client_id=" +
                    CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
    $.ajax({
      url: token_uri,
      type: "POST",
      success: function (data) {
        alert(data);
        alert(JSON.stringify(data));
      },
      error: function (err) {
        alert(err);
        alert(JSON.stringify(err));
      }
    });
  }
}

//https://www.coinbase.com/oauth/authorize?grant_type=authorization_code&code=05cded88ff915bb76ae0b109b78ce9d98cd0d8050c34c565188cddb4b7c05cda&redirect_uri=https://bitrunapp.herokuapp.com&client_id=68cfc8c475c6730bd046e4da8039a76edfa76f913bf58d7d0ddaffe937360139&client_secret=d376095308bb244127abfa069cb9aff9787f5542238051b9e3d67cbf0fa2477d
