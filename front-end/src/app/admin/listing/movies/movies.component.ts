import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit , OnDestroy {

 
  isReadMore:boolean = true
  isEdit:boolean = false
  movie!: Movie
  movies: Movie[] = []
  loader:boolean = false
  subscription !: Subscription

  showText() {
     this.isReadMore = !this.isReadMore
  }


  constructor(public _movieService:MoviesService){}

  ngOnInit(): void {
    this.loader = true
    this.subscription =  this._movieService.listMovies()
    .subscribe(movie=>{
      this.movies = movie
      console.log(this.movies);
      
      this.loader = false
    },(err)=>{
      console.log(err);
      this.loader = false
    })
  }


deleteMovie(id:string){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this._movieService.deleteMovie(id)
      .subscribe(movie=>{
        console.log(movie);
        this.loader = false
      },err=>{
        console.log(err);
        this.loader = false
      })
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

editMovie(id:string)
{
  this.isEdit = true
  this._movieService.getMovieById(id)
  .subscribe(movie=>{
    this.movie=movie
    console.log(this.movie);
    
  })
}

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

}
