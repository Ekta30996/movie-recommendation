import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() name:string =''
  @Output() changeName: EventEmitter<string> = new EventEmitter()
  componment:string = ''

  constructor(public _authService: AuthService,
    private router: Router){
      console.log(this.router.url);
    }

  ngOnInit(): void {
    this.changeName.emit('hello')  
  }
  
  
} 
