$(document).ready(function() {
  $("#signup").hide();
  $(".progress").hide();
  $(["[data-toggle='tooltip']"]).tooltip();
  //URLs for dev
  var localhost = 'http://localhost:8080/',
      plottio = 'http://plottio.com/';
  var signedUp = false;  //flage to check if email has been submited

  // Submiting emails Top Page
  $("#submitUp").click(function(e) {
    e.preventDefault();
    var data = $("#up").val();
    $.ajax({
			type: 'POST',
			data: JSON.stringify({"email": data}),
      contentType: 'application/json',
      url: plottio,
      success: function(data) {
        processSuccess(data, "#up");
      },
      error  : function() {
        console.log('error');
      }
    });
  });

  // Submiting emails Bottom Page
  $("#submitDown").click(function(e) {
    e.preventDefault();
    if(signedUp == false) {
      var data = $("#down").val();
      $.ajax({
        type: 'POST',
        data: JSON.stringify({"email": data}),
        contentType: 'application/json',
        url: plottio,
        success: function(data) {
          processSuccess(data, "#down");
        },
        error  : function() {
          console.log('error');
        }
      });
    } else {

    }

  });

  $("#join").click(function(e) {
    e.preventDefault();
    $("#join").slideUp();
    $("#signup").slideDown("slow");
    scrollToAnchor("id1");
    ga('send', 'event', 'SlideDown', 'Participate_button', 'Participate');
  });

  $("#blog").click(function(e) {
    e.preventDefault();
    ga('send', 'event', 'PlottioSocial', 'Go to PlottioSocial', 'PlottioSocial');
    window.open("http://blog.plottio.com", "_blank");
  });

  function processSuccess(data, upDown) {
    console.log(data.res);
    if(data.res == "already used") {
      $(upDown).val(data.email + " - already used");
    } else if(data.res == "bad email"){
      $(upDown).val("bad email");
    } else {
      signedUp = true;
      $("#up").val("Thank you");
      $("#down").val("Thank you");
      $("#submitUp").attr("disabled", true);
      $("#submitDown").attr("disabled", true);
      $("#revoUp").html("<em>Welcome to Plottio! Expected beta - late October.</em>");
      $("#revoDown").html("<em>Welcome to Plottio! Expected beta - late October.</em>");
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

  // Google Analytics Intelligent Events
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
    window.open("http://twitter.com/intent/tweet?text=Social+Journalism+Revolution+has+been+started+by+@plottio.+I+am+a+Supporter.+Are+you%3F+&url=http%3A//plottio.com", "_blank");
  });
  $("#fb-mobile").click(function() {
    ga('send', 'event', 'Facebook_mobile_share', 'Facebook share', 'Facebook');
    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fplottio.com", '_blank');
  });
});
