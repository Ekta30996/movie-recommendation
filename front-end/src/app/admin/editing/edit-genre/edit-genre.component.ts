import { Component, OnInit } from '@angular/core';
import { GenresService } from 'src/app/shared/service/genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private _genreService: GenresService){}

  ngOnInit(): void {
    
  }

}
