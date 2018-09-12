const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


// Check if username is taken
router.post('/checkforusername', (req, res, next) => {
	const username = req.body.username;
	console.log("post request received!");

	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(user){
			console.log("Username found");
			return res.json({success: true, msg: 'Username exists'});
		} else {
			console.log("Username not found");
			return false;
		}
	});
});

// Check if email is taken
router.post('/checkforemail', (req, res, next) => {
	const email = req.body.email;
	console.log("post request received!");

	User.getUserByEmail(email, (err, user) => {
		if(err) throw err;
		if(user){
			console.log("Email found");
			return res.json({success: true, msg: 'Email exists'});
		} else {
			console.log("Email not found");
			return false;
		}
	});
});

// Register
router.post('/register', (req, res, next) => {
	let newUser = new User({
		email: req.body.email,
		username: req.body.username.replace(/\s/g, ""),
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if(err || !User.validateUser(newUser)){
			res.json({success: false, msg:'Failed to register user.'});
		} else {
			res.json({success: true, msg:'User registered'});
			console.log("User registered: " + newUser.email + " (" + newUser.username + ")");
		}
	});
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.getUserByEmail(email, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'User not found'});
		}

		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				console.log(user.username + " logged in.");
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 604800 // 1 week expiration
				});

				res.json({
					success: true,
					token: 'JWT ' + token,
					user: {
						id: user._id,
						username: user.username,
						email: user.email
					}
				});
			} else {
				return res.json({success: false, msg: 'Wrong password'});
			}
		});
	});
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user});
});

module.exports = router;