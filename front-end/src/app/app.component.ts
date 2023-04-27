import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _authService:AuthService,
    public router: Router){}


  
   
}
