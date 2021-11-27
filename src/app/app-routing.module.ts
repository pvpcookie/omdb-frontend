import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'movie',
    loadChildren: () => import('src/app/movie/movie.module').then( module => module.MovieModule )
  },
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
