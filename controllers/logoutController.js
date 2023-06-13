var express = require('express');
var router = express.Router();
const session = require('express-session');

//Import loginUser function and userModel object
const { loginUser, userModel } = require("../models/userModel");

/* Login User */
router.post('/', async function(req, res, next){
  if (req.session) {
    req.session.destroy();
  }
  res.redirect('/');
});

module.exports = router;