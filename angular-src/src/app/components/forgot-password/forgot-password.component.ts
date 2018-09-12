import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRecoverSubmit(){
  	this.flashMessagesService.show("Sorry, this does nothing right now.", {cssClass: 'alert-danger', timeout: 3000});
  }

}
