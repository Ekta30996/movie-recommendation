import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';

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

  paramSubscription!: Subscription;
  favoriteSubscription!: Subscription;
  watchSubscription!: Subscription;
 

  isReadMore = true;
  isWatchNow: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((param) => {
      this.getMovie(param['id']);
    });

    this.favoriteSubscription = this._movieService
      .listFavoritelist()
      .subscribe((movie) => {
        this.favoriteMovies = movie;
        console.log(this.favoriteMovies);
      });

    this.watchSubscription = this._movieService
      .listWatchlist()
      .subscribe((movie) => {
        this.watchMovies = movie;
        console.log(this.watchMovies);
      });
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  getMovie(id: string) {
    this._movieService.getMovieById(id).subscribe(
      (movie) => {
        this.movie = movie;
        this.favoriteMovies.map((movie) => {
          if (movie === this.movie) {
            this.addToFavorite = true;
            console.log('favoritelist' + this.addToFavorite);
          }
        });
        this.watchMovies.map((movie) => {
          if (movie === this.movie) {
            this.addToWatch = true;
            console.log('watchlist' + this.addToWatch);
          }
        });
        // console.log(res);
      },
      (err) => {
        // console.log(err);
      }
    );
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
