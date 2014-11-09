window.createSocketConnection = function () {
  console.log("Try to create socket connection");
  $("#socket").removeAttr("style");
  var client = io("https://bitrunapp.herokuapp.com");
};
