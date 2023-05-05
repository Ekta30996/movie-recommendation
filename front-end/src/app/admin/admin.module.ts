import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './listing/list/list.component';
import { UploadComponent } from './uploading/upload/upload.component';
import { MoviesComponent } from './listing/movies/movies.component';
import { GenresComponent } from './listing/genres/genres.component';
import { UploadMovieComponent } from './uploading/upload-movie/upload-movie.component';
import { UploadGenreComponent } from './uploading/upload-genre/upload-genre.component';
import { UploadThumbComponent } from './uploading/upload-thumb/upload-thumb.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    UploadComponent,
    MoviesComponent,
    GenresComponent,
    UploadMovieComponent,
    UploadGenreComponent,
    UploadThumbComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule,NgxPaginationModule],
})
export class AdminModule {}
