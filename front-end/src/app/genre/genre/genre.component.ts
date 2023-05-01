import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit , OnDestroy{

  genres: Genre[] = []
  subscription!: Subscription
  loader:boolean = false
  isClicked:boolean = false
  constructor(private _genreService: GenresService){}
 
  ngOnInit(): void {
    this.subscription =  this._genreService.loadGenre()
    .subscribe((genre)=>{
      this.genres = genre
      console.log(this.genres);
    })
  }

  onClickGenre(id: string)
  {
    this.isClicked = !this.isClicked
    this._genreService.getGenreById(id)
    .subscribe(genre=>{
      console.log(genre);
    })

    this._genreService.addGenre(id)
    .subscribe((genre)=>{
      console.log(genre);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
