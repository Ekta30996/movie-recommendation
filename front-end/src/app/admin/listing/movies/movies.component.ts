import {
  Component,
  OnDestroy,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import {
  Subscription,
} from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';
import { ThumbService } from 'src/app/shared/service/thumb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  isReadMore: boolean = true;
  isEdit: boolean = false;
  addThumb: boolean = false;
  movie!: Movie;
  movies: Movie[] = [];
  loader: boolean = false;
  listMovieSubscription!: Subscription;
  deleteMovieSubscription!: Subscription;
  editMovieSubscription!: Subscription;


  page: number = 1
  count: number = 0
  tableSize: number = 2
  tablesSizes: number[] = [2,4,6]

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  constructor(private _movieService: MoviesService,
    private _thumbService: ThumbService) {}

  ngOnInit(): void {
    this.loader = true;
    this.listAllMovies()   
   }


   listAllMovies()
   {
    this.listMovieSubscription = this._movieService.listMovies().subscribe(
      (movie) => {
        this.movies = movie;
        console.log(this.movies)
        this.loader = false;
      },
      (err) => {
        console.log(err);
        this.loader = false;
      }
    );
  }

  movieTrackBy(index:number,movie:Movie):string{
    return movie._id
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

  

  deleteMovie(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMovieSubscription =  this._movieService.deleteMovie(id).subscribe(
          (movie) => {
            console.log(movie);
            this.loader = false;
            Swal.fire('Deleted!', 'Movie has been deleted.', 'success');
            this.movies = this.movies.filter(item => item['_id'] != id);
          },
          (err) => {
            console.log(err);
            this.loader = false;
          }
        );
      }
    });
  }

  editMovie(id: string) {
    this.isEdit = true;
    this.editMovieSubscription = this._movieService.getMovieById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }

  uploadThumb(id: string) {
    this.addThumb = true;
    this._movieService.getMovieById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }

  deleteThumb(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMovieSubscription =  this._thumbService.deleteThumb(id).subscribe(
          (thumb) => {
            console.log(thumb);
            this.loader = false;
          },
          (err) => {
            console.log(err);
            this.loader = false;
          }
        );
        Swal.fire('Deleted!', 'Thumbnail has been deleted.', 'success');
      }
    });
  }


  

  ngOnDestroy(): void {
    this.listMovieSubscription.unsubscribe();
    if(this.deleteMovieSubscription){
      this.deleteMovieSubscription.unsubscribe()
    }
    if(this.editMovieSubscription)
    {
      this.editMovieSubscription.unsubscribe()
    }
  }
}
