
var admin = require("firebase-admin");
var http = require('http');
var fs = require('fs');
var path = require('path');

var serviceAccount =require( path.resolve( __dirname, "./civil-project-a2241-firebase-adminsdk-d94wg-b243a39f9a.json" ) );
// require("\\civil-project-a2241-firebase-adminsdk-d94wg-b243a39f9a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://civil-project-a2241.firebaseio.com"
});



var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

var jsonParser = bodyParser.json();


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
var urlencodedParser=bodyParser.urlencoded({ extended: true });

//app.use(express.bodyParser());




  app.get('/myaction1', (req,res)=> {
    var obj = {
      table: []
   };
    function listAllUsers(nextPageToken) {
      // List batch of users, 1000 at a time.
      admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {
          listUsersResult.users.forEach(function(userRecord) {
            console.log('user', userRecord.toJSON());
            obj.table.push(userRecord.toJSON());
          });
          if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
          }
          var json = JSON.stringify(obj);
    res.send(json);
        })
        .catch(function(error) {
          console.log('Error listing users:', error);
        });
    }
    // Start listing users from the beginning, 1000 at a time.
    listAllUsers();
    
    
    });



  




    app.post('/myactiondelete', urlencodedParser, function (req, res) {
var uid1=req.body.key.toString();
admin.auth().deleteUser(uid1)
  .then(function() {

    admin.database().ref().child("users/"+uid1).remove();

    console.log('Successfully deleted user');
    res.redirect('https://infinitysalongroup.com/employee.html');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });


    })

    app.post('/myactiondelete1', urlencodedParser, function (req, res) {
      var uid1=req.body.key.toString();
      
      
          admin.database().ref().child("sites/"+uid1).remove().then(function(){
            console.log('Successfully deleted site');
            res.redirect('https://infinitysalongroup.com/site.html');
          })
      
          
        
      
      
          })


    app.post('/myaction98', urlencodedParser, function (req, res) {
      console.log(req.body.abc3);
      var sitename=req.body.abc0.toString();
      var city=req.body.abc10.toString();
      var jcb=req.body.abc20.toString();
      var machine=req.body.abc30.toString();
      var siteid=req.body.abc40.toString();
      var workers=req.body.abc60.toString();
      var malecost=req.body.abc601;
      var femalecost=req.body.abc602;
    
    
      
      
     
          var db = admin.database().ref().child("sites/"+siteid).child("sitedata");
          var db1 = admin.database().ref().child("sites/"+siteid).child("DATABASE").set({
            gg:34
          }).then(function(){
    
           db.set({
             DATABASE:"dd",
           sitename1:sitename,
           city1:city,
           jcb1:jcb,
           machine1:machine,
           siteid1:siteid,
           workers1:workers,
           malecost1:malecost,
           femalecost1:femalecost,
           DATABASE:67,
            
    
           }).
          then(function(){
            console.log('Successfully created new site:');
            //  res.send(userRecord.uid);
             res.redirect('https://infinitysalongroup.com/site.html');
    
    
          })
         
          // See the UserRecord reference doc for the contents of userRecord.
         
        })
         
           
         
         
          
          
          
         
          
          
        })
        






app.post('/myaction', urlencodedParser, function (req, res) {
  console.log(req.body.abc3);
  var dat2=req.body.abc4.toString();
  var dat3=req.body.abc5.toString();
  var dat5=req.body.abc6.toString();
  var dat6=req.body.abc7.toString();

  admin.auth().createUser({
    email: req.body.abc1,
    emailVerified: false,
    phoneNumber: "+91"+req.body.abc3.toString(),
    password:req.body.abc2 ,
    displayName: req.body.abc,
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false

  }
  )
    .then(function(userRecord) { 
      var db = admin.database().ref().child("users/"+userRecord.uid);
     

       db.set({
        email: userRecord.email.toString(),
        uid:userRecord.uid.toString(),
id:dat5,
        phone:userRecord.phoneNumber.toString(),
        name:userRecord.displayName.toString(),
        place:dat3+",  "+dat2,
        employeeid: dat6,
        

       }).
      then(function(){
        console.log('Successfully created new user:', userRecord.uid);
        //  res.send(userRecord.uid);
         res.redirect('https://infinitysalongroup.com/employee.html');


      })
     
      // See the UserRecord reference doc for the contents of userRecord.
     
     
     
       
     
     
      
      
      
     
      
      
    })
    .catch(function(error) {
      console.log('Error creating new user:', error);
      res.redirect('https://infinitysalongroup.com/employee.html');

    });
})

app.listen(9000, function() {
  console.log('Server running at http://15.206.67.160:9000');
});