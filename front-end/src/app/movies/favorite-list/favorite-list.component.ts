import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.interface';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit , OnDestroy {

  favoritelist:Movie[] = []
  subscription!: Subscription
  loader:boolean = false
  constructor(private _movieService:MoviesService){}

  ngOnInit(): void {
    this.loader = true
    this.subscription = this._movieService.listFavoritelist()
    .subscribe(movie=>{
      this.favoritelist = movie
      this.loader = false
      console.log(this.favoritelist);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
