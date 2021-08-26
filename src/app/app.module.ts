import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { HeaderComponent } from './header/header.component';
import { TvShowListComponent } from './tv-show/tv-show-list/tv-show-list.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { SafeurlPipe } from './pipes/safeurl.pipe';
import { TvShowDetailComponent } from './tv-show/tv-show-detail/tv-show-detail.component';

/** Material Modules */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CountDownComponent } from './count-down/count-down.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeIdPipe } from './pipes/youtube-id.pipe';
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HeaderComponent,
    TvShowListComponent,
    HomeComponent,
    MovieDetailComponent,
    SafeurlPipe,
    TvShowDetailComponent,
    CountDownComponent,
    YoutubePlayerComponent,
    YoutubeIdPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    YouTubePlayerModule
  ],
  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [AppComponent],
  entryComponents: [MovieDetailComponent, TvShowDetailComponent]
})
export class AppModule {}
