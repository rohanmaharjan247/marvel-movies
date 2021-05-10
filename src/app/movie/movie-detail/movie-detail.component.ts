import { Component, Inject, OnInit, SecurityContext, ɵBypassType } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Movies } from 'src/app/models/movies.interface';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movies;
  safeUrl: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {movieId:number}, private marvelService: MarvelService, private domSanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
    this.getMovieDetail();
    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/RxAtuMu_ph4');
  }

  getMovieDetail(){
    if(this.data.movieId){
      this.marvelService.getMovieById(this.data.movieId).subscribe((data)=>{
        this.movie = data.movie;
      });
    }
  }

  getYoutubeUrlId(url: string) {
    if (url != '' && url != null && url) {
      let youtubeUrl = 'https://www.youtube.com/embed/';
      let splitUrl = url.split('/');
      let yid = splitUrl[splitUrl.length -1];
      let completeUrl = youtubeUrl + yid;
      return yid;
    }
    return '';
  }

}
