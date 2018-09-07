import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

	authToken: any;
	user: any;

  constructor(private http: HttpClient) { }
  	
  	/*
  	Change urls to rickymolnar.com:3000 for production and localhost:3000 for development.
  	*/

	registerUser(user){
	    let headers= new HttpHeaders({
	    	'Content-Type': 'application/json'
	    });
	    return this.http.post('http://rickymolnar.com:3000/users/register', user, {headers: headers});
	  }

	authenticateUser(user){
	    let headers= new HttpHeaders({
	    	'Content-Type': 'application/json'
	    });
	    return this.http.post('http://rickymolnar.com:3000/users/authenticate', user, {headers: headers});
	}

 	getProfile() {
	    this.loadToken();
		let headers = new HttpHeaders({
		      'Authorization': this.authToken,
		      'Content-Type':'application/json'
		});﻿
	    return this.http.get('http://rickymolnar.com:3000/users/profile', {headers: headers});
	}

	storeUserData(token, user){
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	loggedIn(){
 	    this.loadToken();
   		if (this.authToken == undefined ){
    		return false
   		} else {
 			const helper = new JwtHelperService();
   			return !helper.isTokenExpired(this.authToken);
   		}
  	}

	logout(){
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}

}
