import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/shared/genre.interface';
import { Movie } from 'src/app/shared/movie.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.css']
})
export class UploadMovieComponent implements OnInit , OnChanges {

  @Input() movieDetail!: Movie
  isEdit:boolean = false
  uploadForm!:FormGroup
  selectedFile!:File
  genres:Genre[]=[]
  progress: number = 0;


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
    if(this.selectedFile  && this.selectedFile.type === 'video/mp4'){
      // console.log('correct');
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'file must be .mp4 ',
        showConfirmButton: false,
        timer: 4000,
      })
      this.uploadForm.reset()
    }
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
    this._movieService.uploadMovie(fd)
    .subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent:
          // console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          // console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          // console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
          Swal.fire({
            icon: 'success',
            title: 'Genre uploaded successfully',
            showConfirmButton: true,
            timer: 4000,
          });
      }
      if (event['status'] === 'SUCCESS') {
        Swal.fire({
          icon: 'success',
          title: 'Genre uploaded successfully',
          showConfirmButton: true,
          timer: 4000,
        });
      }  
    },
    (err)=>{
      if (err['status'] == '401') {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized user ',
          showConfirmButton: false,
          timer: 4000,
        });
      }
    })
      this.uploadForm.reset()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEdit = true
    this.movieDetail && this.uploadForm.patchValue({title: this.movieDetail.title})
    this.movieDetail && this.uploadForm.patchValue({description: this.movieDetail.description})
    // this.movieDetail && this.uploadForm.patchValue({file:this.movieDetail.video})
  }

  onEdit(){
    console.log('edit');
    
  }
}
