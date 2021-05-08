import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TvShows } from 'src/app/models/tv-shows.interface';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss']
})
export class TvShowListComponent implements OnInit {

  tvShowList: TvShows[] = [];
  loading = false;
  searchText = '';
  //paginator
  totalPage = 0;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOption = [1,5,10,15];

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getTvShows();
  }

  getTvShows(){
    this.loading = true;
    this.marvelService.getAllTvShows(this.pageNumber, this.pageSize).subscribe((data)=>{
      console.log("Rv shw", data.tvShows);
      this.tvShowList = data.tvShows;
      this.totalPage = data.totalTvshows
      this.loading = false;
    })
  }

  onChangeEvent(pageEvent: PageEvent){
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.getTvShows();
  }

  filterMovies(){
    console.log(this.searchText);
    this.loading = true;
    this.marvelService.getFilteredTvShows(this.searchText).subscribe((data)=>{
      this.tvShowList = data.tvShows;
      this.totalPage = data.totalTvshows;
      this.loading = false;
    })
  }

  reset(){
    if(this.searchText==''){
      this.getTvShows();
    }
  }
}
