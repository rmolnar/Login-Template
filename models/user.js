const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User schema
const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
		trim: true,
		minlength: 8,
		maxlength: 64
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 4,
		maxlength: 20 
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 64
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findByID(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	console.log("Searching for username: " + username);	
	User.findOne({username: username}, callback);
}

module.exports.getUserByEmail = function(email, callback){
	console.log("Searching for email: " + email);	
	User.findOne({email: email}, callback);
}

// Repeat validation of user registration info on the server side to prevent any funny business
module.exports.validateUser = function(user){
	if(user.email == undefined || user.username == undefined || user.password == undefined){
		return false;
	}

	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!re.test(user.email)){
		return false;
	}

	let numbers = /[0-9]/g;
	if(!user.password.match(numbers)){
		return false;
	}

	return true;
}

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if(err) throw err
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
}