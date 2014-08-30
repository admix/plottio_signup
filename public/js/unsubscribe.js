$(document).ready(function() {
  var localhost = 'http://localhost:8080/unsubscribe',
      plottio = 'https://plottio.com/unsubscribe';

  $("#unsubscribe").click(function(e) {
    e.preventDefault();
    var result = confirm("Are you sure that you want to unsubscribe?");
    if(result) { //if yes
      var data = $("#unsubscribe-email").val();
      $.ajax({
        type: 'POST',
        data: JSON.stringify({"email": data}),
        contentType: 'application/json',
        url: plottio,
        success: function(data) {
          processSuccess(data);
        },
        error  : function() {
          console.log('error');
        }
      });
    } else { //if no
      console.log("User is not unsubscribing");
    }

  });

  function processSuccess(data) {
    console.log(data.res);
    $("#unsubscribe-email").val("");
    $("#after-success").html(data.res);
  }
});
