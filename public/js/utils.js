$(document).ready(function() {
  //$("#signup").hide();
  $("#join").hide();
  $(".progress").hide();
  $(function () { $("[data-toggle='tooltip']").tooltip(); });

  $('#usernameUp').tooltip('hide');
  $("#tool").tooltip('hide');
  $("#addon").tooltip('hide');

  // URLs for dev
  var plottio = 'http://plottio:8080/',
      plottio = 'http://plottio.com/';
  var signedUp = false;  //flage to check if email has been submited

  var valid = false;
  // Modal image
  $("#img1").click(function(e) {
    $("#img_modal").attr("src","../images/screen_app/main.png");
  });
  $("#img2").click(function(e) {
    $("#img_modal").attr("src","../images/screen_app/edit.png");
  });
  $("#img4").click(function(e) {
    $("#img_modal").attr("src","../images/screen_app/edit.png");
  });

  $("#img3").click(function(e) {
    $("#img_modal").attr("src","../images/screen_app/read.png");
  });

  $( "#usernameUp" ).focus(function() {
    $("#tool").tooltip('show');
  });
  $( "#username" ).focus(function() {
    $("#addon").tooltip('show');
  });
  //Submiting emails Top Page
  $("#submitUp").click(function(e) {
    e.preventDefault();
    var userEmail = $("#up").val();
    var username = $("#usernameUp").val();
    if (valid) {
      $.ajax({
        type: 'GET',
        data: JSON.stringify({"username": username}),
        contentType: 'application/json',
        url: plottio + username,
        success: function(data) {
          if(data == "used") {
            $("#usernameUp").addClass("top-input");
            $("#usernameUp").tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                    .data("title", "Oops! This username is taken.")
                    .tooltip();
          } else {
            $("#usernameUp").removeClass("top-input");
            $("#usernameUp").data("title", "")
                    .tooltip("destroy");
            $.ajax({
              type: 'POST',
              data: JSON.stringify({"email": userEmail, "username": username}),
              contentType: 'application/json',
              url: plottio,
              success: function(data) {
                processSuccess(data, "#up");
              },
              error  : function() {
                console.log('error');
              }
            });
          }

        },
        error  : function() {
          console.log('error');
        }
      });
    }
  });

  // validate top username
  $('#usernameUp').blur(function() {

    $("#usernameUp").val($("#usernameUp").val().replace(/\s+/g, ''));
    var username = $("#usernameUp").val();
    var usernameRegexUp = /^[a-zA-Z0-9]+$/;
    if(username.match(usernameRegexUp)){
      $("#tool").tooltip('hide');
      $.ajax({
        type: 'GET',
        data: JSON.stringify({"username": username}),
        contentType: 'application/json',
        url: plottio + username,
        success: function(data) {
          if(data == "used") {
            valid = false;
            $("#usernameUp").addClass("top-input");
            $("#usernameUp").tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                    .data("title", "Oops! This username is taken.")
                    .tooltip({
                        placement : 'right'
                    });
          } else {
            valid = true;
            $("#usernameUp").removeClass("top-input");
            $("#usernameUp").data("title", "")
                    .tooltip("destroy");
          }

        },
        error  : function() {
          console.log('error');
        }
      });
    } else {
      valid = false;
      $("#tool").tooltip('show');
    }

  });


  // Submiting emails Bottom Page
  $("#submitDown").click(function(e) {
    e.preventDefault();
    if(signedUp == false) {
      var userEmail = $("#down").val();
      var username = $("#username").val();
      if (valid) {
        $.ajax({
          type: 'GET',
          data: JSON.stringify({"username": username}),
          contentType: 'application/json',
          url: plottio + username,
          success: function(data) {
            if(data == "used") {
              $("#username").addClass("top-input");
              $("#addon").addClass("top-input");
              $("#username").tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                      .data("title", "Oops! This username is taken.")
                      .tooltip();
            } else {
              $("#username").removeClass("top-input");
              $("#addon").removeClass("top-input");
              $("#username").data("title", "")
                      .tooltip("destroy");
              $.ajax({
                type: 'POST',
                data: JSON.stringify({"email": userEmail,"username": username}),
                contentType: 'application/json',
                url: plottio,
                success: function(data) {
                  processSuccess(data, "#down");
                },
                error  : function() {
                  console.log('error');
                }
              });
            }

          },
          error  : function() {
            console.log('error');
          }
        });
      }
    } else {

    }
  });

  // validate bottom username
  $('#username').blur(function() {
    $("#username").val($("#username").val().replace(/\s+/g, ''));

    var username = $("#username").val();
    var usernameRegex = /^[a-zA-Z\d]+$/;
    if(username.match(usernameRegex)) {
      $("#addon").tooltip('hide');
      $.ajax({
        type: 'GET',
        data: JSON.stringify({"username": username}),
        contentType: 'application/json',
        url: plottio + username,
        success: function(data) {
          if(data == "used") {
            valid = false;
            $("#username").addClass("top-input");
            $("#addon").addClass("top-input");
            $("#username").tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                    .data("title", "Oops! This username is taken.")
                    .tooltip({
                        placement : 'right'
                    });
          } else {
            valid = true;
            $("#username").removeClass("top-input");
            $("#addon").removeClass("top-input");
            $("#username").data("title", "")
                    .tooltip("destroy");
          }

        },
        error  : function() {
          console.log('error');
        }
      });
    } else {
      valid = false;
      $("#username").addClass("top-input");
      $("#addon").addClass("top-input");
      $("#addon").tooltip('show');
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
    console.log("data: " + data);
    if(data.res == "already used") {
      $(upDown).val(data.email + " - already used");
    } else if(data.res == "username required"){
      $("#usernameUp").val(data.res);
    } else if(data.res == "bad email"){
      $(upDown).val("bad email");
    } else {
      signedUp = true;
      $("#up").val("Thank you");
      $("#down").val("Thank you");
      $("#username").val("Username reserved");
      $("#usernameUp").val("Username reserved");
      $("#submitDown").attr("disabled", true);
      $("#submitUp").attr("disabled", true);
      $("#revoDown").html("<em>Welcome to Plottio! Expected beta - late October.</em>");
      //openProgress();

      ga('send', 'event', 'Signup: ' + upDown, 'Signup Button', 'Signup');
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
