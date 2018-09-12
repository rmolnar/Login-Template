import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

	authToken: any;
	user: any;

	// Change to localhost:3000 for development and rickymolnar.com:3000 for production	
	server = 'http://rickymolnar.com:3000';

  constructor(private http: HttpClient) {} 

  	// Ask server to check database if username exists
  	checkForUsername(username){
  		let headers = new HttpHeaders({
  			'Content-Type': 'application/json'
  		});
	    console.log("Attempting post request to check username...");	  		
	    return this.http.post(this.server + '/users/checkforusername', username, {headers: headers});
  	}

  	// Ask server to check database if email exists
  	checkForEmail(email){
  		let headers = new HttpHeaders({
  			'Content-Type': 'application/json'
  		});
	    console.log("Attempting post request to check email...");	  		
	    return this.http.post(this.server + '/users/checkforemail', email, {headers: headers});
  	}

  	// Send registration information to the server
	registerUser(user){
	    let headers = new HttpHeaders({
	    	'Content-Type': 'application/json'
	    });
	    return this.http.post(this.server + '/users/register', user, {headers: headers});
	  }

	// Send authentication information to the server
	authenticateUser(user){
	    let headers = new HttpHeaders({
	    	'Content-Type': 'application/json'
	    });
	    return this.http.post(this.server +'/users/authenticate', user, {headers: headers});
	}

	// Get profile information from the server
 	getProfile() {
	    this.loadToken();
		let headers = new HttpHeaders({
		      'Authorization': this.authToken,
		      'Content-Type':'application/json'
		});﻿
	    return this.http.get(this.server + '/users/profile', {headers: headers});
	}

	// Store user and token information in local storage
	storeUserData(token, user){
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	// Get token from local storage
	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	// Check if login token in local storage is valid
	loggedIn(){
 	    this.loadToken();
   		if (this.authToken == undefined ){
    		return false
   		} else {
 			const helper = new JwtHelperService();
   			return !helper.isTokenExpired(this.authToken);
   		}
  	}

  	// Clear the token, log the user out
	logout(){
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}

}
