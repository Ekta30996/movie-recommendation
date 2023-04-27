import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RecommendComponent } from './recommend/recommend.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LatestComponent } from './latest/latest.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { SearchComponent } from '../shared/search/search.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'recommend',component:RecommendComponent,canActivate:[AuthGuard]},
  {path:'favoritelist',component:FavoriteListComponent,canActivate:[AuthGuard]},
  {path:'watchlist',component:WatchListComponent,canActivate:[AuthGuard]},
  {path:'latest',component:LatestComponent},
  {path:'search/:q',component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
