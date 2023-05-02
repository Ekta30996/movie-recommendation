import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  watchlist: Movie[] = [];
  subscription!: Subscription;
  loader: boolean = false;
  constructor(private _movieService: MoviesService) {}

  ngOnInit(): void {
    this.loader = true;
    this.subscription = this._movieService
      .listWatchlist()
      .subscribe((movie) => {
        this.watchlist = movie;
        this.loader = false;
        // console.log(movie);
        // console.log(this.watchlist);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
