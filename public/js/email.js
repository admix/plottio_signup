var nodemailer = require('nodemailer'),
    habitat = require("habitat");

habitat.load();
var env = new habitat(),
    useremail = env.get("EMAIL"),
    userpwd = env.get("PASS");

function sendEmail(user) {
  // create reusable transport method (opens pool of SMTP connections)
  var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: useremail,
          pass: userpwd
      }
  });


  var body = '<p>Here we meet again,<br><br>Plottio Team would like to thank you for the support of this Social Journalism Revolution.<br><br>We know as a fact, that only together we can accomplish something as tremendous and we deeply value your contribution. An early access is just a small gift that will not suffice to express our gratitude. While we are working tirelessly on creating the best experience, please share the word with your social circles to help us achieve this goal.<br><br>P.S. Information on the website will be constantly updated to give you a "behind the scenes" insight on our progress, so feel free to check back anytime soon. Until next time.<br><br>Yours truly,<br><br>Plottio Team</p>'
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "✔ Plottio Team <support@gmail.com>", // sender address
      to: user, // list of receivers
      subject: "Wellcome to Plottio ✔", // Subject line
      //text: "Hi there! ✔", // plaintext body
      html: body// html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent");
      }

      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
}

exports.sendEmail = sendEmail;
