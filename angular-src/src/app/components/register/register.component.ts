import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

	username: String;
	email: String;
	password: String;
  confirmEmail: String;
  confirmPassword: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  onRegisterSubmit(){
  	const user = {
  		email: this.email,
  		username: this.username,
  		password: this.password,
      confirmEmail: this.confirmEmail,
      confirmPassword: this.confirmPassword

  	}

  	// Make sure user entered all fields
  	if(!this.validateService.validateRegister(user)){
  		this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 3000});
  		return false;
  	}

  	// Make sure email is in correct format
  	if(!this.validateService.validateEmail(user.email)){
  		this.flashMessagesService.show('Please enter a valid email address.', {cssClass: 'alert-danger', timeout: 3000});
  		return false;
  	}

    // Make sure password is at least 8 characters
    if(!this.validateService.validatePasswordLength(user.password)){
      this.flashMessagesService.show('Password must be at least 8 characters.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Make sure password contains a number
    if (!this.validateService.validatePasswordNumber(user.password)){
      this.flashMessagesService.show('Password must contain a number.', {cssClass: 'alert-danger', timeout: 3000});
      return false;      
    }

    // Make sure the user confirms their email
    if (this.email != this.confirmEmail)
    {
      this.flashMessagesService.show('Emails do not match.', {cssClass: 'alert-danger', timeout: 3000});
      return false;          
    }

    // Make sure the user confirms their email
    if (this.password != this.confirmPassword)
    {
      this.flashMessagesService.show('Passwords do not match.', {cssClass: 'alert-danger', timeout: 3000});
      return false;          
    }

    console.log("Beginning username check...");
    // Check if username is already taken
    this.authService.checkForUsername(user).subscribe((result) => {
      if (result){
        this.flashMessagesService.show('Username already taken.', {cssClass: 'alert-danger', timeout: 3000});
        return false;         
      }
    });

    console.log("Beginning email check...");
    // Check if email is already taken
    this.authService.checkForEmail(user).subscribe((result) => {
      if (result){
        this.flashMessagesService.show('Email already taken.', {cssClass: 'alert-danger', timeout: 3000});
        return false;         
      }
    });



    // If everything checks out, register the user!
    this.authService.registerUser(user).subscribe(data => {
      if((data as any).success){
      this.flashMessagesService.show('Successfully registered user!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
      } else {
      this.flashMessagesService.show('Error in user registration.', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
      }
    });

  }

}
