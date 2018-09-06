import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // Verify that all registration information has been entered
  validateRegister(user) {
  	if(user.email == undefined || user.username == undefined || user.password == undefined){
  		return false;
  	} else {
  		return true;
  	}
  }

  // Make sure that the email is in the correct format
  validateEmail(email) {
  	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return re.test(email);
  }
}
