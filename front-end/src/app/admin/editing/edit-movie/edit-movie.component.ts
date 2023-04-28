import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/shared/genre.interface';
import { Movie } from 'src/app/shared/movie.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input() movieDetail!: Movie

  uploadForm!:FormGroup
  selectedFile!:File
  genres:Genre[]=[]
  loader:boolean = false

  constructor(private fb:FormBuilder,
    private _genreService:GenresService,
    private _movieService:MoviesService,
    ){}

  ngOnInit(): void {
   
    this.uploadForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      file:[null,Validators.required],
      genre:['',Validators.required]
    })

    this._genreService.loadGenre()
    .subscribe(genre=>{
      this.genres = genre
    })
  }

  ngOnChanges(): void {
    this.movieDetail && this.uploadForm.patchValue({title : this.movieDetail.title});
    this.movieDetail && this.uploadForm.patchValue({description : this.movieDetail.description});
    this.movieDetail && this.uploadForm.patchValue({genre : this.movieDetail.genre});
    // this.movieDetail && this.uploadForm.patchValue({genre : this.movieDetail.genre});
  }
  onFileSelected(event:Event){
    const target= event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }

  get title() {
    return this.uploadForm.get('title');
  }

  get description() {
    return this.uploadForm.get('description');
  }

  get file() {
    return this.uploadForm.get('file');
  }

  get genre() {
    return this.uploadForm.get('genre');
  }
  onUpload(){}
}
