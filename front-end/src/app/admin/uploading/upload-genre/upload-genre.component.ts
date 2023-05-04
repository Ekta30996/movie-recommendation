import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-genre',
  templateUrl: './upload-genre.component.html',
  styleUrls: ['./upload-genre.component.css'],
})
export class UploadGenreComponent implements OnInit, OnChanges, OnDestroy {
  @Input() genreDetail!: Genre;

  uploadGenreSubscription!: Subscription;
  editGenreSubscription!: Subscription;

  isEdit: boolean = false;
  inProgress: boolean = false;
  isSelectedInEditMode: boolean = false;

  progress: number = 0;

  uploadForm!: FormGroup;
  selectedFile!: File;

  message: string = '';

  imgURL: any;

  reader = new FileReader();

  constructor(private fb: FormBuilder, private _genreService: GenresService) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      genre: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      file: [null, Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    console.log(this.selectedFile);

    if (
      this.selectedFile.type == 'image/jpg' ||
      this.selectedFile.type == 'image/jpeg' ||
      this.selectedFile.type == 'image/png' ||
      this.selectedFile.type == 'image/webp' ||
      this.selectedFile.type == 'image/avif' ||
      this.selectedFile.type == 'image/svg'
    ) {
      this.reader.readAsDataURL(this.selectedFile);
      this.reader.onload = (_event) => {
        this.imgURL = this.reader.result;
        // console.log(this.imgURL);
      };
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Only accept image file',
        showConfirmButton: false,
        timer: 4000,
      });
      console.log();

      this.uploadForm.reset();
      this.imgURL = this.reader.EMPTY;
    }
  }

  get genre() {
    return this.uploadForm.get('genre');
  }

  get file() {
    return this.uploadForm.get('file');
  }

  onUpload() {
    const fd = new FormData();
    fd.append('genre', this.uploadForm.get('genre')?.value);
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.inProgress = true;

    this.uploadGenreSubscription = this._genreService.uploadGenre(fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          setTimeout(() => {
            this.inProgress = false;
            this.progress = 0;
            this.imgURL = this.reader.EMPTY;
            Swal.fire({
              icon: 'success',
              title: 'Genre uploaded successfully!!',
              showConfirmButton: false,
              timer: 4000,
            });
          }, 1000);
        }
      },
      (err) => {
        if (err['status'] === '500') this.progress = 0;
        this.inProgress = false;
        Swal.fire({
          icon: 'error',
          title: 'No intenet connection',
          showConfirmButton: false,
          timer: 4000,
        });
        // this.message = 'Could not upload the file!';
        this.imgURL = this.reader.EMPTY;
        // console.log(this.message);
      }
    );
    this.uploadForm.reset();
  }

  ngOnChanges(): void {
    this.isEdit = true;
    this.genreDetail &&
      this.uploadForm.patchValue({ genre: this.genreDetail?.['genre'] });
  }

  onEdit(id: string) {
    const fd = new FormData();
    fd.append('genre', this.uploadForm.get('genre')?.value);
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.inProgress = true;
    this.isSelectedInEditMode = true;

    this.editGenreSubscription = this._genreService.editGenre(id, fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          // console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          setTimeout(() => {
            this.inProgress = false;
            this.progress = 0;
            this.imgURL = this.reader.EMPTY;
            Swal.fire({
              icon: 'success',
              title: 'Genre edited successfully!!',
              showConfirmButton: false,
              timer: 4000,
            });
          }, 1000);
        }
      },
      (err) => {
        if (err['status'] === '500') this.progress = 0;
        this.inProgress = false;
        Swal.fire({
          icon: 'error',
          title: 'No intenet connection',
          showConfirmButton: false,
          timer: 4000,
        });
        // this.message = 'Could not upload the file!';
        this.imgURL = this.reader.EMPTY;
        // console.log(err);
      }
    );
    this.uploadForm.reset();
  }

  ngOnDestroy(): void {
    if (this.uploadGenreSubscription) {
      this.uploadGenreSubscription.unsubscribe();
    }
    if (this.editGenreSubscription) {
      this.editGenreSubscription.unsubscribe();
    }
  }
}
