import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username: String;
	password: String;

  constructor(
  	private authService: AuthService,
  	private router: Router,
  	private flashMessagesService: FlashMessagesService
  	) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  	const user = {
  		username: this.username,
  		password: this.password
  	}


    if (this.username && this.password){
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
       this.flashMessagesService.show('Please enter username and password.', {cssClass: 'alert-danger', timeout: 3000});
       this.router.navigate(['login']);
    }
  }
}
