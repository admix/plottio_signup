function testEmail(db, email, username, callback) {
  "use strict";
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
        emails.findAndModify({"email": email},[['_id','asc']],  // sort order
        {$set: {"username":username}}, function(err, data) {
          if(err) {
            console.warn(err.message);
          } else {
            callback(null);
          }
        });
        return true;
      }else {
        callback(null, object.email);
        return false;
      }
  });
}

function removeEmail(db, email, callback) {
  "use strict"
  var emails = db.collection("emails");
  var emailsBackup = db.collection("emails_backup");
  emails.remove({"email": email}, function(err, object) {
    if (err){  //error
      console.warn(err.message);
    }else {  // returns error if no matching object found
      callback(null);
    }
  });

  emailsBackup.insert({"email": email,"used":false}, function(err, data) {
    if(err) {
      console.warn(err.message);
    } else {

    }
  });
}

function checkUsername(db, username, callback) {
  "use strict"
  var emails = db.collection("emails");
  emails.findOne({'username': username}, function(err, doc) {
    if(err || doc == null) {
      callback(null, "Not found!");
    } else {
      //console.log(doc);
      callback(null, "used");
    }
  });
}

exports.testEmail = testEmail;
exports.removeEmail = removeEmail;
exports.checkUsername = checkUsername;
