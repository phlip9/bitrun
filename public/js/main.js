// initialize document
$(document).ready(function () {

  // render section 1
  $("#bg1").css("height", window.computeStandardHeight());
  $("#start").toggleClass("disabled");

  // check whether the user successfully logged in
  window.isUserLoggedIn(function (err, data) {
    if (err) {
      alert("Log In Failed: " + JSON.stringify(err));
    } else if (data) {
      $("#bg1").css("display", "none");
      $("#bg2").css("height", window.computeStandardHeight());
      $("#bg2").removeAttr("style");

      window.getUser(data, function (err, _data) {
        if (err) {
          console.error(err);
          console.error(JSON.stringify(err));
        } else if (_data) {
          window.userId = _data;
          console.log("User ID get: %s", _data);
          window.getIncentive();
        }
      });
    }
  });

});

// compute the height for body
window.computeStandardHeight = function () {
  var h = window.innerHeight;
  var elem = document.getElementById("myHeader");
  var _h = parseInt(window.getComputedStyle(elem, null).height);
  return h - _h + "px";
};

window.getUser = function (data, cb) {
  $.post("/api/coinbase", {
      url: "/users?access_token=" + data.access_token,
      method: 'GET'
    }).done(function (response) {
      cb(null, response.users[0].user.id);
    }).fail(function (err) {
      cb(err)
    });
};

window.getIncentive = function () {
  var id = window.userId;
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
  window.setIncentiveReact();
};

window.createIncentive = function (incentive) {
  $("#loading").removeAttr("style");

  var create_date = moment().format("YYYY-MM-DDTHH:mm:ssZ");
  var date_table = {
    every_two_weeks: [2, "week"],
    weekly: [1, "week"],
    monthly: [1, "month"],
    yearly: [1, "year"]
  };

  var d = date_table[incentive.repeat];
  var expire_date = moment().add(d[0], d[1]).format("YYYY-MM-DDTHH:mm:ssZ");

  incentive['coinbase_id'] = window.userId;

  $.post("/api/incentive/" + window.userId, {
    coinbase_id: window.userId,
    amount: incentive.amount,
    expire_date: expire_date,
    create_date: create_date,
    goal: incentive.goal
  })
   .done(function (data) {
     console.log("Incentive Created for %s", window.userId);
     console.log(data, JSON.stringify(data));
   })
   .fail(function (err) {
     console.error(err);
   });

  $.post("/api/coinbase/checkout", incentive)
   .done(function (link) {
     console.log("Link generated: %s", link);
     window.location.assign(link);
   })
   .fail(function (err) {
     console.error(err);
   });
};
