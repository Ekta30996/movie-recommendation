import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/shared/genre.interface';
import { Movie } from 'src/app/shared/movie.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import { ThumbService } from 'src/app/shared/service/thumb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-thumb',
  templateUrl: './upload-thumb.component.html',
  styleUrls: ['./upload-thumb.component.css']
})
export class UploadThumbComponent {

  @Input() movieDetail!: Movie
  isAdded:boolean = false
  uploadForm!:FormGroup
  selectedFile!: File
  progress: number = 0
  message:string = ''
  inProgress:boolean = false
  imgURL: any
  reader = new FileReader()
  isSelectedInEditMode:boolean = false

  constructor(private fb:FormBuilder,
    private _thumbService:ThumbService,
    ){}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      file:[null,Validators.required]
    })
  }

  onFileSelected(event:Event){
    const target= event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    console.log(this.selectedFile);

    if(this.selectedFile.type ==='image/jpg' || 
        this.selectedFile.type ==='image/jpeg'|| 
        this.selectedFile.type ==='image/png' || 
        this.selectedFile.type ==='image/webp'||
        this.selectedFile.type ==='image/avif' )
        {
          this.reader.readAsDataURL(this.selectedFile); 
          this.reader.onload = (_event) => {
          this.imgURL = this.reader.result; 
        }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Only accept image file',
        showConfirmButton: false,
        timer: 4000,
      });
      this.uploadForm.reset()
      this.imgURL = this.reader.EMPTY
    }    
  }

  get file() {
    return this.uploadForm.get('file');
  }

  onUpload(id:string){
    const fd = new FormData()
    fd.append('thumb',this.selectedFile,this.selectedFile.name)
      this.inProgress = true
      this._thumbService.uploadThumb(id,fd).subscribe(
        (event:any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            setTimeout(() => {  
              this.inProgress = false
              this.progress = 0;
              this.imgURL = this.reader.EMPTY
              Swal.fire({
                icon: 'success',
                title: 'Thumbnail uploaded successfully!!',
                showConfirmButton: false,
                timer: 4000,
              });
            }, 1000);
          }
        },
        err => {
          if(err['status'] === '500')
          this.progress = 0;
          this.inProgress = false
          Swal.fire({
            icon: 'error',
            title: 'No intenet connection',
            showConfirmButton: false,
            timer: 4000,
          });

          if(err['status'] === '409')
          this.progress = 0;
          this.inProgress = false
          Swal.fire({
            icon: 'error',
            title: 'Thumbnail is already exists',
            showConfirmButton: false,
            timer: 4000,
          });
          this.message = 'Could not upload the file!';
          this.imgURL = this.reader.EMPTY
          console.log(err);
          
        }); 
    this.uploadForm.reset()
  }
  
  ngOnChanges(): void {
    this.isAdded = true
  }
}
