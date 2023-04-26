import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {


  constructor(private _movieService:MoviesService){}

  ngOnInit(): void {
    this._movieService.currentMovie
    .subscribe(movie=>{
      console.log(movie);
      
    })
  }
}
