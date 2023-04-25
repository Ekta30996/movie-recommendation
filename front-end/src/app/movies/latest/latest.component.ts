import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit , OnDestroy {

  movies:Movie[]=[]
  movie!: Movie
  destroy$:Subject<boolean> = new Subject<boolean>()
  // paramSubscription! :Subscription 
  loader:boolean = false

  constructor(private _movieService:MoviesService ,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.loader = true
    this._movieService.listMovies()
      .pipe(takeUntil(this.destroy$)).
      subscribe((movie)=>{
        this.movies = movie
        this.loader = false
        console.log(this.movies);
      })
    }

    // onClick(){
    //   this.paramSubscription = this.activatedRoute.params.subscribe(param=>{
    //     this.getMovie(param['id'])
    //   })
    // }

    getMovie(id:string){
    this._movieService.getMovieById(id)
    .subscribe(res=>{
      this.movie = res
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
    // this.paramSubscription.unsubscribe()
  }
}
