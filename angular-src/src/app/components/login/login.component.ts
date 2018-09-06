import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: String;
	password: String;

  constructor(
  	private authService: AuthService,
  	private router: Router,
  	private flashMessagesService: FlashMessagesService,
    private validateService: ValidateService
  	) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  	const user = {
  		email: this.email,
  		password: this.password
  	}

    // If all info is entered, attempt to login
    if (this.email && this.password){
    	this.authService.authenticateUser(user).subscribe(data => {
    		if((data as any).success){
    			this.authService.storeUserData((data as any).token, (data as any).user);
     			this.flashMessagesService.show('Successfully logged in.', {cssClass: 'alert-success', timeout: 3000}); 			
     			this.router.navigate(['dashboard']);
    		} else {
    			this.flashMessagesService.show((data as any).msg, {cssClass: 'alert-danger', timeout: 3000});
    			this.router.navigate(['login']);
    		}
    	});
    } else {
       this.flashMessagesService.show('Please enter email and password.', {cssClass: 'alert-danger', timeout: 3000});
       this.router.navigate(['login']);
    }
  }
}
