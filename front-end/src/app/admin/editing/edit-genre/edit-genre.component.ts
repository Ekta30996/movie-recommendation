import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit,OnChanges {

  @Input() genreDetail!:Genre
  uploadForm!:FormGroup
  selectedFile!: File
  loader:boolean = false
  constructor(private fb:FormBuilder,
    private _genreService:GenresService,
    private router:Router){}

  ngOnInit(): void {    
    this.uploadForm = this.fb.group({
      genre:[,Validators.required],
      file:[null,Validators.required]
    })
  }

  ngOnChanges(): void {
    this.genreDetail && this.uploadForm.patchValue({genre : this.genreDetail.genre});
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

  }
}
