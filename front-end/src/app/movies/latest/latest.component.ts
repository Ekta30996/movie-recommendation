import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
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
  state:Movie[] =[] 
  destroy$: Subject<boolean> = new Subject<boolean>();
  search$!: Subscription;
  listMovieSubscription!: Subscription
  loader: boolean = false;

  searchText: any = '';

  page: number = 1
  count: number = 0
  tableSize: number = 9
  tablesSizes: number[] = [9,18,27,36]

  constructor(private _movieService: MoviesService) {}

  ngOnInit(): void {
    this.loader = true;
    this.listAllMovies()
  }


  movieTrackBy(index:number, movie:Movie):string {
    return movie._id;
  }

  listAllMovies(){
    this.listMovieSubscription = this._movieService
    .listMovies()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (movie) => {
        this.movies = movie;
        this.loader = false;
        // console.log(this.movies);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.listAllMovies();
  }

  onTableSizeChange(event: any): void { 
    this.tableSize = event.target.AsNumber;
    this.page = 1;
    this.listAllMovies();
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
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((movie) => {
        // console.log(movie);
        this.movies = movie;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
