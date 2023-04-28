import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  movies: Movie[] = [];
  addToWatch: boolean = false;
  addToFavorite: boolean = false;
  paramSubscription!: Subscription;
  isReadMore = true;
  isWatchNow: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _movieService: MoviesService,
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((param) => {
      this.getMovie(param['id']);
    });
    this._movieService.listFavoritelist().subscribe((res) => {
      this.movies = res;
      console.log('favorite list' + this.movies);
    });
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  getMovie(id: string) {
    this._movieService.getMovieById(id).subscribe(
      (res) => {
        this.movie = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendMovieDeatils() {
    this.isWatchNow = true;
  }

  addWatchList(id: string) {
    this._movieService.addToWatchlist(id).subscribe((res) => {
      this.addToWatch = !this.addToWatch;
      console.log(res);
    });
  }

  addFavoriteList(id: string) {
    this._movieService.addToFavoritelist(id).subscribe((res) => {
      this.addToFavorite = !this.addToFavorite;
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
