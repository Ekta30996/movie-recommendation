import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.css']
})
export class UploadMovieComponent implements OnInit {

  uploadForm!:FormGroup
  selectedFile!:File
  genres:Genre[]=[]
  loader:boolean = false

  constructor(private fb:FormBuilder,
    private _genreService:GenresService,
    private _movieService:MoviesService,
    private router:Router){}

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
  onUpload(){
    const fd = new FormData()
    fd.append('title',this.uploadForm.get('title')?.value)
    fd.append('description',this.uploadForm.get('description')?.value)
    fd.append('file',this.selectedFile,this.selectedFile.name)
    fd.append('genre',this.uploadForm.get('genre')?.value)
    this.loader = true
    this._movieService.uploadMovie(fd)
    .subscribe((res)=>{
      if (res['status'] === 'SUCCESS') {
        Swal.fire({
          icon: 'success',
          title: 'Movie uploaded successfully',
          showConfirmButton: true,
          timer: 4000,
        });
        this.loader = false
        // this.router.navigate(['/list/movies'])
      } 
    },(err)=>{
      if (err['status'] == '401') {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized user ',
          showConfirmButton: false,
          timer: 4000,
        });
      }
      console.log(err);  
    })
    // console.log(this.uploadForm.value); 
    this.uploadForm.reset()
  }
}
