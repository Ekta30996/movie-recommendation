import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit , OnDestroy {

  movies: Movie[] = []
  subscription!: Subscription
  loader: boolean = false
  constructor(private _movieService: MoviesService){}
  
  ngOnInit(): void {
    this.loader = true
    this.subscription = this._movieService.listMovieByGenre()
    .subscribe(movie=>{
      this.movies = movie
      this.loader = false
      console.log(this.movies);
    },err=>{
      console.log(err);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
