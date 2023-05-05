import {
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import  jwt_decode from "jwt-decode";
import { User } from 'src/app/user/profile/user.interface';
import { MoviesService } from '../service/movies.service';
import { Movie } from '../movie.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  constructor(public _authService: AuthService ,
    private _movieService:MoviesService,
    private router: Router) {}
  
  token!:any
  user!:User
  searchText = ''

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

  onSearchTextEntered(searchValue: any) {
    this.searchText = searchValue;
    console.log(this.searchText);
        this.router.navigate(['/movies/latest/',{q:this.searchText}]);
  }
}
