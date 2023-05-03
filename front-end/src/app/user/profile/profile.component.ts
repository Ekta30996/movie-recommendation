import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import  jwt_decode from "jwt-decode";
import { User } from './user.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit , OnDestroy {

  genrelist:any[] =[]
  user!:User
  token!: any
  genre:boolean = false
  about:boolean = true
  constructor(public _authService: AuthService){}

  ngOnInit(): void {
    this._authService.getGenreList()
      .subscribe(genre=>{
        this.genrelist.push(genre)
        // console.log(this.genrelist);
      })   
      this.token = this._authService.getToken()
      this.user = this.getDecodedToken(this.token)
      // console.log(this.user);
  }
  
  getDecodedToken(token: string): any {
    try {
      return jwt_decode(token);      
    } catch(Error) {
      return null;
    }
  }

  onGenre(){
    this.genre = true
    this.about = false
  }

  onAbout(){
    this.about = true
    this.genre = false
  }
  ngOnDestroy(): void {
    
  }
}
