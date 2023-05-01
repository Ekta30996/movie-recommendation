import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:'movies',loadChildren:()=>import('./movies/movies.module').then(m=>m.MoviesModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'genre',loadChildren:()=>import('./genre/genre.module').then(m=>m.GenreModule)},
  {path:'**' , component:PageNotFoundComponent}

];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
