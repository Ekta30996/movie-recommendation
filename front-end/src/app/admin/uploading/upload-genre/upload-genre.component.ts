import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-genre',
  templateUrl: './upload-genre.component.html',
  styleUrls: ['./upload-genre.component.css']
})
export class UploadGenreComponent implements OnInit , OnChanges {

  @Input() genreDetail!: Genre
  isEdit:boolean = false
  uploadForm!:FormGroup
  selectedFile!: File
  loader:boolean = false
  progress: number = 0;

  constructor(private fb:FormBuilder,
    private _genreService:GenresService,
    private router:Router){}


  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      genre:['',Validators.required],
      file:[null,Validators.required]
    })
  }

  ngOnChanges(): void {
    this.isEdit = true
    this.genreDetail && this.uploadForm.patchValue({genre : this.genreDetail?.['genre']});
  }
  onFileSelected(event:Event){
    const target= event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }

  get genre() {
    return this.uploadForm.get('genre');
  }

  get file() {
    return this.uploadForm.get('file');
  }

  onUpload(){
    const fd = new FormData()
    fd.append('genre',this.uploadForm.get('genre')?.value)
    fd.append('image',this.selectedFile,this.selectedFile.name)
    // this.loader = true   
    this._genreService.uploadGenre(fd)
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
        this.loader = false
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
}
