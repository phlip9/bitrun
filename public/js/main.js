$(document).ready(function () {

  // hide section 2
  $("#bg2").css("display", "none");

  // check whether the user successfully logged in
  window.isUserLoggedIn(function (err, data) {
    if (err) {
      alert("Log In Failed: " + JSON.stringify(err));
    } else if (data) {
      $("#bg1").css("display", "none");
      $("#bg2").css("height", window.computeStandardHeight());
      $("#bg2").removeAttr("style");

      window.getIncentive(data, function (err, data) {
        if (err) {
          console.error(err);
          console.error(JSON.stringify(err));
        } else {
          console.log(data);
          console.log(JSON.stringify(data));
        }
      });
    }
  });

  // render section 1
  $("#bg1").css("height", window.computeStandardHeight());
});

// compute the height for body
window.computeStandardHeight = function () {
  var h = window.innerHeight;
  var elem = document.getElementById("myHeader");
  var _h = parseInt(window.getComputedStyle(elem, null).height);
  return h - _h + "px";
};

window.getIncentive = function (data, cb) {
  //var next = function () {};

  $.get(
      "https://api.coinbase.com/v1/users?access_token=" + data.access_token
    ).done(function (response) {
      cb(null, response.users[0].user.id);
    }).fail(function (err) {
      cb(err)
    });
};
