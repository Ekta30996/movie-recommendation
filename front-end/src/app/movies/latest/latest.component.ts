import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css'],
})
export class LatestComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  movie!: Movie;
  destroy$: Subject<boolean> = new Subject<boolean>();
  search$!: Subscription;
  // paramSubscription! :Subscription
  loader: boolean = false;

  searchText: any = '';

  constructor(
    private _movieService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this._movieService
      .listMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (movie) => {
          this.movies = movie;
          this.loader = false;
          console.log(this.movies);
        },
        (err) => {
          console.log(err);
        }
      );
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
        console.log(movie);
        this.movies = movie;
      });
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
