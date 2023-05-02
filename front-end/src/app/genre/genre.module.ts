import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreComponent } from './genre/genre.component';

import { GenreRoutingModule } from './genre-routing.module';

@NgModule({
  declarations: [GenreComponent],
  imports: [CommonModule, GenreRoutingModule],
})
export class GenreModule {}
