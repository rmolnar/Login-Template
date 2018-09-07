import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

	user: Object;
  username;

  constructor(
  	private authService: AuthService,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
  		this.user = (profile as any).user;
      this.username = (this.user as any).username;
  	},
  	err => {
  		console.log(err);
  		return false;
  	});
  }

}
