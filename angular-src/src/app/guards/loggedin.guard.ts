import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Injectable() 

export class LoggedInGuard implements CanActivate{
	constructor(private authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService){

	}

	canActivate() {
		if(this.authService.loggedIn()){
			this.flashMessagesService.show('You are already logged in.', {cssClass: 'alert-danger', timeout: 3000});
			this.router.navigate(['/dashboard']);
			return false;			
		} else {
			return true;
		}
	}
}
