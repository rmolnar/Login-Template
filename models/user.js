const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User schema
const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findByID(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
	const query = {email: email}
	User.findOne(query, callback);
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

	if(!user.password.length >= 8){
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