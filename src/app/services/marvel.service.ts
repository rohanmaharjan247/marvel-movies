import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Movies } from '../models/movies.interface';
import { map } from 'rxjs/operators';
import { TvShows } from '../models/tv-shows.interface';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  apiUrl = '';
  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private httpClient: HttpClient
  ) {
    this.apiUrl = baseUrl;
  }

  getAllMovies(currentPage: number, pageSize: number) {
    return this.httpClient
      .get<{ message: string; movies: Movies[]; totalMovies: number }>(
        `${this.apiUrl}api/mcu/movies`,
        {
          params: new HttpParams()
            .set('currentPage', String(currentPage))
            .set('pageSize', String(pageSize)),
        }
      )
      .pipe(
        map((moviesData) => {
          return {
            message: moviesData.message,
            movies: moviesData.movies.map((mapData) => {
              if (mapData.release_date != null) {
                mapData.release_date = new Date(mapData.release_date);
              }
              return mapData;
            }),
            totalMovies: moviesData.totalMovies,
          };
        })
      );
  }

  getFilteredMovies(searchText: string) {
    return this.httpClient.get<{
      message: string;
      movies: Movies[];
      totalMovies: number;
    }>(`${this.apiUrl}api/mcu/filter-movies`, {
      params: new HttpParams().set('searchText', searchText),
    });
  }

  getMovieById(id: number) {
    return this.httpClient
      .get<{ message: string; movie: Movies }>(
        `${this.apiUrl}api/mcu/movies/${id}`
      )
      .pipe(
        map((movieData) => {
          if (movieData.movie.release_date != null)
            movieData.movie.release_date = new Date(
              movieData.movie.release_date
            );
          return {
            message: movieData.message,
            movie: movieData.movie,
          };
        })
      );
  }

  getBoxOffice() {
    return this.httpClient
      .get<{
        message: string;
        movies: Movies[];
        totalMovies: number;
      }>(`${this.apiUrl}api/mcu/box-office`)
      .pipe(
        map((moviesData) => {
          return {
            message: moviesData.message,
            movies: moviesData.movies.map((mapData) => {
              if (mapData.release_date != null) {
                mapData.release_date = new Date(mapData.release_date);
              }
              return mapData;
            }),
            totalMovies: moviesData.totalMovies,
          };
        })
      );
  }

  // upcomingMovies(){
  //   return this.httpClient.get<{mesage: string, upcomingMovie: Movies}>(`${this.apiUrl}api/mcu/upcoming-movies`);
  // }

  getFilteredTvShows(searchText: string) {
    return this.httpClient.get<{
      message: string;
      tvShows: TvShows[];
      totalTvshows: number;
    }>(`${this.apiUrl}api/mcu/filter-tv-shows`, {
      params: new HttpParams().set('searchText', searchText),
    });
  }

  getAllTvShows(currentPage: number, pageSize: number) {
    return this.httpClient
      .get<{
        message: string;
        tvShows: TvShows[];
        totalTvshows: number;
      }>(`${this.apiUrl}api/mcu/tv-shows`, {
        params: new HttpParams()
          .set('currentPage', String(currentPage))
          .set('pageSize', String(pageSize)),
      })
      .pipe(
        map((tvShowsData) => {
          return {
            message: tvShowsData.message,
            tvShows: tvShowsData.tvShows.map((mapData) => {
              if (mapData.release_date != null) {
                mapData.release_date = new Date(mapData.release_date);
              }
              return mapData;
            }),
            totalTvshows: tvShowsData.totalTvshows,
          };
        })
      );
  }

  getTvShowById(id: number) {
    return this.httpClient
      .get<{ message: string; tvshow: TvShows }>(
        `${this.apiUrl}api/mcu/tv-shows/${id}`
      )
      .pipe(
        map((tvShowData) => {
          if (tvShowData.tvshow.release_date != null)
            tvShowData.tvshow.release_date = new Date(
              tvShowData.tvshow.release_date
            );
          return {
            message: tvShowData.message,
            tvshow: tvShowData.tvshow,
          };
        })
      );
  }
}
