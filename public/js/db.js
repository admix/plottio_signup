function testEmail(db, email, callback) {
  "use strict";
  console.log("in email");
  var emails = db.collection("emails");
  emails.findAndModify(
  {"email": email}, // query
  [['_id','asc']],  // sort order
  {$set: {"used":true}},
  {upsert:true}, // options
  function(err, object) {
      if (err){  //error
        console.warn(err.message);
      }else if(object.email == undefined) {  // returns error if no matching object found
        callback(null);
        return true;
      }else {
        callback(null, object.email);
        return false;
      }
  });
}
exports.testEmail = testEmail;
