import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // Verify that all registration information has been entered and there are no nulls/spaces
  validateRegister(user) {
  	if(user.email == undefined || user.username == undefined || user.password == undefined){
  		return false;
  	} else {
      return true;
    }
  }

  // Check if email is in the correct format
  validateEmail(email) {
  	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return re.test(email);
  }

  // Check if password is long enough
  validatePasswordLength(password) {
    if(password.length >= 8){
      return true;
    } else {
      return false;
    }
  }

  // Check if password contains a number
  validatePasswordNumber(password) {
    let numbers = /[0-9]/g;
    if(password.match(numbers)) {
      return true;
    } else {
      return false;
    }
  }

}
