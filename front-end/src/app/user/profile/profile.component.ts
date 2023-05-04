import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import  jwt_decode from "jwt-decode";
import { User } from './user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit , OnChanges ,OnDestroy {

  genrelist:any[] =[]
  user!:User
  token!: any
  genre:boolean = false
  about:boolean = true
  constructor(public _authService: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this._authService.getGenreList()
      .subscribe(genre=>{
        this.genrelist.push(genre)
        // console.log(this.genrelist);
      },
      (err)=>{
        if (err['status'] == '0') {
         Swal.fire({
           icon: 'error',
           title: 'Server is not running',
           showConfirmButton: false,
           timer: 4000,
         });
       }
       else if (err['status'] == '401') {
         Swal.fire({
           icon: 'error',
           title: 'Unauthorized user',
           showConfirmButton: false,
           timer: 4000,
         });
         this.router.navigate(['/'])
       }
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

  ngOnChanges(changes: SimpleChanges): void {
    this.onNavigateGenre()
  }

  onNavigateGenre(){
    this.router.navigate(['/genre/genre'])
  }
  ngOnDestroy(): void {
    
  }
}
