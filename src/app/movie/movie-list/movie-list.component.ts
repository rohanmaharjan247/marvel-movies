import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Movies } from '../../models/movies.interface';
import { MarvelService } from '../../services/marvel.service';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  private marvelMoviesSub: Subscription;

  movieList: Movies[] = [];

  loading = false;
  searchText = '';

  //paginator
  totalPage = 0;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOption = [1, 5, 10, 15];

  constructor(
    private _marvelService: MarvelService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.marvelMoviesSub.unsubscribe();
  }
  ngOnInit(): void {
    this.getMarvelMovies();
  }

  getMarvelMovies() {
    this.loading = true;
    this.marvelMoviesSub = this._marvelService
      .getAllMovies(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.movieList = data.movies;
        this.totalPage = data.totalMovies;
        this.loading = false;
      });
  }

  onChangeEvent(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.getMarvelMovies();
  }

  filterMovies() {
    this.loading = true;
    this._marvelService.getFilteredMovies(this.searchText).subscribe((data) => {
      this.movieList = data.movies;
      this.totalPage = data.totalMovies;
      this.loading = false;
    });
  }

  reset() {
    if (this.searchText == '') {
      this.getMarvelMovies();
    }
  }

  openDialog(id: number) {
    this.dialog.open(MovieDetailComponent, { data: { movieId: id } });
  }
}
