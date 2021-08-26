import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Movies } from '../models/movies.interface';
import { TvShows } from '../models/tv-shows.interface';
import { MovieDetailComponent } from '../movie/movie-detail/movie-detail.component';
import { MarvelService } from '../services/marvel.service';
import { TvShowDetailComponent } from '../tv-show/tv-show-detail/tv-show-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  upcomingMovie: Movies;
  upcomingTvShow: TvShows;
  topBoxOffice: Movies[];
  tvShowInfo: TvShows[];

  loadingMovies = false;
  loadingTvShows = false;
  loadingBoxOffice = false;
  loadingTvShoInfo = false;
  constructor(private marvelService: MarvelService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUpcomingMovies();
    this.getUpcomingTvShows();
    this.getBoxOfficeCollection();
    this.getTvShowInfo();
  }

  getUpcomingMovies() {
    this.loadingMovies = true;
    this.marvelService
      .getAllMovies(0, 0)
      .pipe(
        map((upcomingMovieData) => {
          let now = new Date();
          let upcomingMovie = upcomingMovieData.movies
            .filter((x) => x.release_date > now)
            .sort()
            .reverse();
          return upcomingMovie[0];
        })
      )
      .subscribe((data) => {
        this.upcomingMovie = data;
        this.loadingMovies = false;
      });
  }

  getUpcomingTvShows() {
    this.loadingTvShows = true;
    this.marvelService
      .getAllTvShows(0, 0)
      .pipe(
        map((upcomingTvShowData) => {
          let now = new Date();
          let upcomingTvShow = upcomingTvShowData.tvShows
            .filter((x) => x.release_date > now)
            .sort()
            .reverse();
          return upcomingTvShow[0];
        })
      )
      .subscribe((data) => {
        this.upcomingTvShow = data;
        this.loadingTvShows = false;
      });
  }

  getBoxOfficeCollection() {
    this.loadingBoxOffice = true;
    this.marvelService.getBoxOffice().subscribe((data)=>{
      this.topBoxOffice = data.movies;
      this.loadingBoxOffice = false;
    })
  }

  getTvShowInfo(){
    this.loadingTvShoInfo = true;
    this.marvelService.getAllTvShows(1, 5).subscribe((data)=>{
      this.tvShowInfo = data.tvShows;
      this.loadingTvShoInfo = false;
    })
  }

  openDialog(id:number, selector:string){
    if(selector == 'moviedetail'){
      this.dialog.open(MovieDetailComponent, {data: {movieId: id}, panelClass: 'modal-padding-0', width: '750px'});
    }
    else if(selector == 'tvshowdetail'){
      this.dialog.open(TvShowDetailComponent, {data: {tvShowId: id}, panelClass: 'modal-padding-0', width: '750px'});
    }

  }
}
