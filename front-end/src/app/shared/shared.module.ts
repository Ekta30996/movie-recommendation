import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports:[HeaderComponent ,FooterComponent,SearchComponent,SliderComponent]
})
export class SharedModule { }
