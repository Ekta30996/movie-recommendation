import { Component, OnDestroy, OnInit } from '@angular/core';
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

  isReadMore = true

  showText() {
     this.isReadMore = !this.isReadMore
  }
  
  movies: Movie[] = []
  loader:boolean = false

  subscription !: Subscription

  constructor(public _movieService:MoviesService){}

  ngOnInit(): void {
    this.loader = true
    this.subscription =  this._movieService.listMovies()
    .subscribe(movie=>{
      this.movies = movie
      console.log(movie);
      
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

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}
  
}
