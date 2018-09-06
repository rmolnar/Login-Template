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
  		password: this.password
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

    // Register user
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
