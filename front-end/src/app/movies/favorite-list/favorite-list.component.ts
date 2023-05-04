import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit, OnDestroy {

  favoritelist: Movie[] = [];

  subscription!: Subscription;

  loader: boolean = false;
  
  searchText: any;

  constructor(private _movieService: MoviesService,
    private router: Router) {}

  ngOnInit(): void {
    this.subscription = this._movieService
      .listFavoritelist()
      .subscribe((movie) => {
    // this.loader = true;

        this.favoritelist = movie;
        // this.loader = false;
        // console.log(this.favoritelist);
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
  }


  movieTrackBy(index:number, movie:Movie):string {
    return movie._id;
   }

  onSearchTextEntered(searchValue: any) {
    this.searchText = searchValue;
    this.onSearchApi(this.searchText);
  }

  onSearchApi(data: string) {
    const q = data;
    if (q.length === 0) {
      return;
    }
    this._movieService
      .searchMovie(q)
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe((movie) => {
        // console.log(movie);
        this.favoritelist = movie;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
