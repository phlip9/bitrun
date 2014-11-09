$(document).ready(function () {

  // hide section 2
  $("#bg2").css("display", "none");
  $("#dashboard").css("display", "none");
  $("#create").css("display", "none");

  // check whether the user successfully logged in
  window.isUserLoggedIn(function (err, data) {
    if (err) {
      alert("Log In Failed: " + JSON.stringify(err));
    } else if (data) {
      $("#bg1").css("display", "none");
      $("#bg2").css("height", window.computeStandardHeight());
      $("#bg2").removeAttr("style");

      window.getUser(data, function (err, data) {
        if (err) {
          console.error(err);
          console.error(JSON.stringify(err));
        } else if (data) {
          console.log(data);
          console.log(JSON.stringify(data));
          window.getIncentive(data);
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

window.getUser = function (data, cb) {
  //var next = function () {};

  $.post("/api/coinbase", {
      url: "/users?access_token=" + data.access_token,
      method: 'GET'
    }).done(function (response) {
      cb(null, response.users[0].user.id);
    }).fail(function (err) {
      cb(err)
    });
};

window.getIncentive = function (id) {
  $.get("/api/incentive/" + id)
   .done(function (data) {
     if (data) {
       console.log("Incentive Get: %s", JSON.stringify(data));
       window.renderIncentive(data);
     } else {
       console.log("User does not have incentive yet");
       window.renderSetIncentive();
     }
   })
   .fail(function (err) {
     console.error(err);
   });
};

window.renderIncentive = function (incentive) {
  $("#loading").css("display", "none");
  $("#dashboard").removeAttr("style");
  window.renderIncentiveReact(incentive);
};

window.renderSetIncentive = function () {
  $("#loading").css("display", "none");
  $("#create").removeAttr("style");
};
