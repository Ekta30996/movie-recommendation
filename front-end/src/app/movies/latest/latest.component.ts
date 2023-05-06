import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  takeUntil,
} from "rxjs";
import { Movie } from "src/app/shared/movie.interface";
import { MoviesService } from "src/app/shared/service/movies.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-latest",
  templateUrl: "./latest.component.html",
  styleUrls: ["./latest.component.css"],
})
export class LatestComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  movie!: Movie;
  state: Movie[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  search$!: Subscription;
  listMovieSubscription!: Subscription;
  paramSubscription!: Subscription;

  loader: boolean = false;

  searchText: any = "";

  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tablesSizes: number[] = [9, 18, 27, 36];

  constructor(
    private _movieService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.listAllMovies();
    this.paramSubscription = this.activatedRoute.params.subscribe((params) => {
      this.onSearchApi(params["q"]);
    });
  }

  movieTrackBy(index: number, movie: Movie): string {
    return movie._id;
  }

  listAllMovies() {
    this.listMovieSubscription = this._movieService
      .listMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (movie) => {
          this.movies = movie;
          this.loader = false;
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
        },
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

  onSearchApi(data: string) {
    const q = data;
    if (q === "") {
      this.movies;
    }
    this._movieService
      .searchMovie(q)
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((movie) => {
        // console.log(movie);
        this.movies = movie;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.paramSubscription.unsubscribe();
  }
}
