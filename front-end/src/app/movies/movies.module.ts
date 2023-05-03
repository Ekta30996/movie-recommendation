import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RecommendComponent } from './recommend/recommend.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LatestComponent } from './latest/latest.component';
import { DetailsComponent } from './details/details.component';
import { WatchNowComponent } from './watch-now/watch-now.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HomePageComponent,
    RecommendComponent,
    FavoriteListComponent,
    WatchListComponent,
    LatestComponent,
    DetailsComponent,
    WatchNowComponent,
  ],
  imports: [CommonModule, SharedModule, MoviesRoutingModule,NgxPaginationModule],
  exports: [HomePageComponent],
})
export class MoviesModule {}
