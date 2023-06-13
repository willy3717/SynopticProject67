var express = require('express');
var router = express.Router();
const session = require('express-session');

//Import loginUser function and userModel object
const { loginUser, userModel } = require("../models/userModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  //Render login view
  res.render('login');
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


  console.log(req.body)
  if(user = await loginUser(username, password)){
    //console.log(user);
    //Set session user to user object returned from loginUser
    req.session.user = user;
    console.log("Login Successful");
    res.redirect('/');
  }
  else{
    res.render('login', { title: 'Login', errorMessage: 'Invalid login credentials.' });
  }
});

module.exports = router;