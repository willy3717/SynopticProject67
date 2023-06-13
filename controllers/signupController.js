var express = require('express');
var router = express.Router();
const session = require('express-session');

//Import loginUser function and userModel object
const { loginUser, userModel, createUser} = require("../models/userModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  //Render login view
  res.render('signup');
  //If there is a valid session active, destroy it
  try{
    req.session.destroy();
    console.log("Session destroyed");
  }
  catch(err){
    console.log(err);
  }
});

/* Login User */
router.post('/', async function(req, res, next){
  //Create new user object
  var user = new userModel();
  //Get username and password from req
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;


  console.log(req.body)
  if(user = await createUser(username, password, false, address)){
    //console.log(user);
    //Set session user to user object returned from loginUser
    req.session.user = user;
    console.log("Signup and login Successful");
    res.redirect('/');
  }
  else{
    res.render('signup', { title: 'Signup', errorMessage: 'Invalid signup credentials.' });
  }
});

module.exports = router;