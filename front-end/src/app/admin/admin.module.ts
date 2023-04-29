import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './listing/list/list.component';
import { UploadComponent } from './uploading/upload/upload.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './listing/movies/movies.component';
import { GenresComponent } from './listing/genres/genres.component';
import { UploadMovieComponent } from './uploading/upload-movie/upload-movie.component';
import { UploadGenreComponent } from './uploading/upload-genre/upload-genre.component';
import { HeaderComponent } from './header/header.component';

import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    UploadComponent,
    HomeComponent,
    MoviesComponent,
    GenresComponent,
    UploadMovieComponent,
    UploadGenreComponent,
    HeaderComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    AdminRoutingModule
  ],
})
export class AdminModule { }
