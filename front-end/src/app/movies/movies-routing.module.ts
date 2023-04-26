import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecommendComponent } from './recommend/recommend.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LatestComponent } from './latest/latest.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomePageComponent},
  {path:'recommend',component:RecommendComponent},
  {path:'favoritelist',component:FavoriteListComponent},
  {path:'watchlist',component:WatchListComponent},
  {path:'latest',component:LatestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
