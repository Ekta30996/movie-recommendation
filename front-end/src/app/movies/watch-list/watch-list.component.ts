import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  watchlist: Movie[] = [];
  subscription!: Subscription;
  loader: boolean = false;
  constructor(private _movieService: MoviesService,
    private router: Router) { }

  ngOnInit(): void {
    // this.loader = true;
    this.subscription = this._movieService
      .listWatchlist()
      .subscribe((movie) => {
        this.watchlist = movie;
        this.loader = false;
        // console.log(movie);
        // console.log(this.watchlist);
      },
        (err) => {
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

  movieTrackBy(index: number, movie: Movie): string {
    return movie._id
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
