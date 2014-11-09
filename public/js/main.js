$(document).ready(function () {
  window.isUserLoggedIn();
  $("#bg1").css("height", window.computeStandardHeight("view1"));
});

window.computeStandardHeight = function (elemId) {
  var h = window.innerHeight;
  var elem = document.getElementById(elemId);
  var _h = parseInt(window.getComputedStyle(elem, null).height);
  return h - _h + "px";
};
