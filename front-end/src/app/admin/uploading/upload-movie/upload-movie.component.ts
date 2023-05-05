import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/shared/genre.interface';
import { Movie } from 'src/app/shared/movie.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import { MoviesService } from 'src/app/shared/service/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.css'],
})
export class UploadMovieComponent implements OnInit, OnChanges, OnDestroy {
  @Input() movieDetail!: Movie;

  isEdit: boolean = false;
  inProgress: boolean = false;
  isSelectedInEditMode: boolean = false;
  loader:boolean = false

  uploadForm!: FormGroup;
  selectedFile!: File;

  progress: number = 0;
  message: string = '';
  videoURL: any;

  reader = new FileReader();

  genres: Genre[] = [];

  genreListSubscription!: Subscription;
  uploadMovieSubscription!: Subscription;
  editMovieSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _genreService: GenresService,
    private _movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(5000),
        ],
      ],
      file: [null, Validators.required],
      genre: ['', Validators.required],
    });

    this.genreListSubscription = this._genreService
      .loadGenre()
      .subscribe((genre) => {
        this.genres = genre;
      });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];

    if (
      this.selectedFile.type === 'video/mp4' ||
      this.selectedFile.type === 'video/mkv'
    ) {
      this.reader.readAsDataURL(this.selectedFile);
      this.reader.onload = (_event) => {
        this.videoURL = this.reader.result;
      };
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Only accept video file',
        showConfirmButton: false,
        timer: 4000,
      });
      this.uploadForm.reset();
      this.videoURL = this.reader.EMPTY;
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
  onUpload() {
    const fd = new FormData();
    fd.append('title', this.uploadForm.get('title')?.value);
    fd.append('description', this.uploadForm.get('description')?.value);
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('genre', this.uploadForm.get('genre')?.value);

    this.inProgress = true;
    this.loader = true
    this.uploadMovieSubscription = this._movieService.uploadMovie(fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          // console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          setTimeout(() => {
            this.inProgress = false;
            this.progress = 0;
            this.videoURL = this.reader.EMPTY;
            this.loader = false
            Swal.fire({
              icon: 'success',
              title: 'Movie uploaded successfully!!',
              showConfirmButton: false,
              timer: 4000,
            });
          }, 1000);
          // console.log(this.message);
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
        this.message = 'Could not upload the file!';
        this.videoURL = this.reader.EMPTY;
      }
    );
    this.uploadForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEdit = true;
    this.movieDetail &&
      this.uploadForm.patchValue({ title: this.movieDetail.title });
    this.movieDetail &&
      this.uploadForm.patchValue({ description: this.movieDetail.description });
    this.movieDetail &&
      this.uploadForm.patchValue({ genre: this.movieDetail.genre });
  }

  onEdit(id: string) {
    const fd = new FormData();
    fd.append('title', this.uploadForm.get('title')?.value);
    fd.append('description', this.uploadForm.get('description')?.value);
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('genre', this.uploadForm.get('genre')?.value);

    this.inProgress = true;
    this.isSelectedInEditMode = true;
    this.loader = true

    this.editMovieSubscription = this._movieService.editMovie(id, fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          // console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          setTimeout(() => {
            this.inProgress = false;
            this.progress = 0;
            this.videoURL = this.reader.EMPTY;
            this.loader = false
            Swal.fire({
              icon: 'success',
              title: 'Movie edited successfully!!',
              showConfirmButton: false,
              timer: 4000,
            });
          }, 1000);
          // console.log(this.message);
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
        this.message = 'Could not upload the file!';
        this.videoURL = this.reader.EMPTY;
        // console.log(err);
      }
    );
    this.uploadForm.reset();
  }

  ngOnDestroy(): void {
    this.genreListSubscription.unsubscribe();
    if (this.uploadMovieSubscription) {
      this.uploadMovieSubscription.unsubscribe();
    }
    if (this.editMovieSubscription) {
      this.editMovieSubscription.unsubscribe();
    }
  }
}
