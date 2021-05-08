import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountDownComponent } from './count-down/count-down.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { TvShowListComponent } from './tv-show/tv-show-list/tv-show-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  { path: 'all-movies', component: MovieListComponent },
  { path: 'all-tv-shows', component: TvShowListComponent },
  {path:'countdown', component: CountDownComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
