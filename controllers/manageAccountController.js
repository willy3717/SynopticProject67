const express = require('express');
const router = express.Router();
const { userModel } = require('../models/userModel');

/* GET manage account page. */
router.get('/', async function(req, res, next) {
    if(typeof req.session.user === 'undefined'){
        console.log("No session detected, redirecting to login");
        res.redirect('/login');
    } else {
        // Fetch the full user object from the database
        const user = await userModel.findOne({ _id: req.session.user._id });
        res.render('manageaccount', { title: "Manage Account", user: user });
    }
});

/* POST manage account page. */
router.post('/', async function(req, res, next) {
    if(typeof req.session.user === 'undefined'){
        console.log("No session detected, redirecting to login");
        res.redirect('/login');
    } else {
        try {
            const { username, address, nationality, email, phone, dob } = req.body;
            await userModel.findOneAndUpdate({ _id: req.session.user._id }, {
                username,
                address,
                nationality,
                email,
                phone,
                dob: new Date(dob)
            }, { runValidators: true });
            res.redirect('/manageaccount');
        } catch (error) {
            res.render('manageaccount', { title: "Manage Account", user: req.body, error: error.message });
        }
    }
});

module.exports = router;
