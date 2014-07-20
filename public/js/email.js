console.log("in email");
var nodemailer = require('nodemailer'),
    habitat = require("habitat");

habitat.load();
console.log("pre env");
var env = new habitat(),
    useremail = env.get("EMAIL"),
    userpwd = env.get("PASS");
console.log("In email.js line 9");
console.log(useremail +"  "+ userpwd);

function sendEmail(user) {
  console.log("in send email");
  // create reusable transport method (opens pool of SMTP connections)
  var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: useremail,
          pass: userpwd
      }
  });


  var body = "<b>Hi there!</b><ul>Wouldn’t it be great if:<li>You could read/write articles that are created by fellow users in real-time without media bias in between?</li><li>You could show your savvy in areas that you are hooked on and inspire the rest of the world?</li><li>You could read it as an online newspaper interconnected with anyone on the resource?</li><li>You would not have to stick to 140 characters limit?</li></ul><p>You could be a part in our Social Journalism Revolution?✔ </p>"
  console.log(body);
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "Alexander Snurnikov ✔ <admix.software@gmail.com>", // sender address
      to: user, // list of receivers
      subject: "Wellcome to Plottio ✔", // Subject line
      text: "Hi there! ✔", // plaintext body
      html: body// html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }

      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
}

exports.sendEmail = sendEmail;
