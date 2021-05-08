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
    console.log(this.data.movieId)
    if(this.data.movieId){
      this.marvelService.getMovieById(this.data.movieId).subscribe((data)=>{
        console.log(data);
        this.movie = data.movie;
        this.countdown();
      });
    }
  }

  countdown(){
    const releasedate: Date = this.movie.release_date;
    const now = new Date();
    const releaseYear = releasedate.getFullYear();
    const releaseMonth = releasedate.getMonth();
    const releaseDay = releasedate.getDate();

    const countDownYear = releaseYear - now.getFullYear();
    const countDownMonth = releaseMonth - now.getMonth();
    const countDownDay = releaseDay -  now.getDate();

    console.log(countDownYear + "y", countDownMonth + "m", countDownDay + "d");

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
