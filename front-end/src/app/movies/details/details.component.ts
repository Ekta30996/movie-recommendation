import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  movie!: Movie;
  favoriteMovies: Movie[] = [];
  watchMovies: Movie[] = [];

  addToWatch: boolean = false;
  addToFavorite: boolean = false;
  favorite!:boolean
  watch!:boolean

  paramSubscription!: Subscription;
  favoriteSubscription!: Subscription;
  watchSubscription!: Subscription;
 

  isReadMore = true;
  isWatchNow: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _movieService: MoviesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((param) => {
      this.getMovie(param['id']);
    });

    this.favoriteSubscription = this._movieService
      .listFavoritelist()
      .subscribe((movie) => {
        this.favoriteMovies = movie;
        // console.log(this.favoriteMovies);
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
     });

    this.watchSubscription = this._movieService
      .listWatchlist()
      .subscribe((movie) => {
        this.watchMovies = movie;
        // console.log(this.watchMovies);
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

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  getMovie(id: string) {
    this._movieService.getMovieById(id).subscribe(
      (movie) => {
        this.movie = movie;
        // console.log(this.movie);
       this.favoriteMovies.filter((f)=>
        {
          if(f._id == this.movie._id){
            console.log('yes');
             this.favorite = true
          } 
          else{
            console.log('no');
            this.favorite = false
          }
        })
        this.watchMovies.filter((w)=>
        {
          if(w._id == this.movie._id){
            console.log('yes');
             this.watch = true
          } 
          else{
            console.log('no');
            this.watch = false
          }
        })
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
       }
     });
  }

  sendMovieDeatils() {
    this.isWatchNow = true;
  }

  addWatchList(id: string) {
    this._movieService
      .addToWatchlist(id)
      .subscribe((res) => {
        this.addToWatch = !this.addToWatch;
        // console.log(res);
      });
  }

  addFavoriteList(id: string) {
    this._movieService
      .addToFavoritelist(id)
      .subscribe((res) => {
        this.addToFavorite = !this.addToFavorite;
        // console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.favoriteSubscription.unsubscribe();
    this.watchSubscription.unsubscribe();
    
  }
}
