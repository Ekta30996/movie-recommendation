import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenresService } from 'src/app/shared/service/genres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-genre',
  templateUrl: './upload-genre.component.html',
  styleUrls: ['./upload-genre.component.css']
})
export class UploadGenreComponent {

  uploadForm!:FormGroup
  selectedFile!: File
  loader:boolean = false
  constructor(private fb:FormBuilder,
    private _genreService:GenresService,
    private router:Router){}


  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      genre:['',Validators.required],
      file:[null,Validators.required]
    })
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
    this.loader = true
    this._genreService.uploadGenre(fd).subscribe((res)=>{
        
        if (res['status'] === 'SUCCESS') {
          Swal.fire({
            icon: 'success',
            title: 'Genre uploaded successfully',
            showConfirmButton: true,
            timer: 4000,
          });
          this.loader = false
          // this.router.navigate(['/list/genres'])
        }  
        // console.log(res);
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
        // console.log(err);
      }
    )
    this.uploadForm.reset();
  }
}
