import {
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import  jwt_decode from "jwt-decode";
import { User } from 'src/app/user/profile/user.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public _authService: AuthService) {}
  token!:any
  user!:User
  ngOnInit(): void {
      this.token = this._authService.getToken()
      this.user = this.getDecodedToken(this.token)
  }

  getDecodedToken(token: string): any {
    try {
      return jwt_decode(token);      
    } catch(Error) {
      return null;
    }
  }
}
