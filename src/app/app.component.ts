import { Component, OnInit } from '@angular/core';
import { Movies } from './models/movies.interface';
import { MarvelService } from './services/marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'marvel-movies';
}
