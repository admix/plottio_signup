$(document).ready(function() {
  $("#signup").hide();
  $(".progress").hide();
  $(["[data-toggle='tooltip']"]).tooltip();
  //URLs for dev
  var localhost = 'http://localhost:8080/',
      plottio = 'http://plottio.com/';

  // Submiting emails
  $("#submit").click(function(e) {
    e.preventDefault();
    var data = $("#email").val();
    $.ajax({
			type: 'POST',
			data: JSON.stringify({"email": data}),
      contentType: 'application/json',
      url: localhost,
      success: function(data) {
        processSuccess(data);
      },
      error  : function() {
        console.log('error');
      }
    });
  });

  $("#join").click(function(e) {
    e.preventDefault();
    $("#join").slideUp();
    $("#signup").slideDown("slow");
    scrollToAnchor("id1");
  })
  function processSuccess(data) {
    console.log(data.res);
    if(data.res == "already used") {
      $("#email").val(data.email + " - already used");
    } else if(data.res == "bad email"){
      $("#email").val("bad email");
    } else {
      $("#email").val("Thank you");
      $("#submit").attr("disabled", true);
      $("#revo").html("<em>Welcome to Plottio! Expected beta - late October.</em>");
      openProgress();
    }
  }

  function scrollToAnchor(aid){
    var aTag = $("a[id='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
  }

  function openProgress() {
    $(".progress").slideDown("slow");
    scrollToAnchor("id2");
  }
});
