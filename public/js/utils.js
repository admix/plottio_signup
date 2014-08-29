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
      url: plottio,
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
    ga('send', 'event', 'SlideDown', 'Participate_button', 'Participate');
  });

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
      //openProgress();
      ga('send', 'event', 'Signup', 'Signup Button', 'Signup');
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

  $("#tw-connect").click(function() {
    ga('send', 'event', 'Social_Connect', 'Twitter connect', 'Twitter');
    window.open("http://twitter.com/plottio", '_blank');
  });
  $("#fb-connect").click(function() {
    ga('send', 'event', 'Social_Connect', 'Facebook connect', 'Facebook');
    window.open("https://www.facebook.com/pages/Plottio/837077572989391?sk=timeline", '_blank');
  });
  $("#in-connect").click(function() {
    ga('send', 'event', 'Social_Connect', 'Linkedin connect', 'Linkedin');
    //window.open("#", '_blank');
  });
  $("#tw-mobile").click(function() {
    ga('send', 'event', 'Twitter_mobile_share', 'Twitter share', 'Twitter');
    window.open("https://twitter.com/home?status=Social%20Journalism%20Revolution%20has%20been%20started%20by%20@plottio.%20I%20am%20a%20Supporter.%20Are%20you?%20http://plottio.com%20%23startup", '_blank');
  });
  $("#fb-mobile").click(function() {
    ga('send', 'event', 'Facebook_mobile_share', 'Facebook share', 'Facebook');
    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fplottio.com", '_blank');
  });
});
