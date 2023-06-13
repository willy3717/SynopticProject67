var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(typeof req.session.user === 'undefined'){
        console.log("No session detected, redirecting to login");
        res.redirect('/login');
    }
    else {
        res.render('notification', {username: req.session.user.username, title: "Get Notified"});
    }
});

module.exports = router;
