$(document).ready(function () {
  window.isUserLoggedIn();
  var h = window.innerHeight;
  var elem = document.getElementById("theHeader");
  var _h = parseInt(window.getComputedStyle(elem, null).height);
  $("#bg1").css("height", (h - _h) + "px");
});
