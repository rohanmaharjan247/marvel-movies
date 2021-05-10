import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShows } from 'src/app/models/tv-shows.interface';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.scss']
})
export class TvShowDetailComponent implements OnInit {
  tvShow:TvShows;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {tvShowId:number}, private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getTvShowDetail();
  }

  getTvShowDetail(){
    this.marvelService.getTvShowById(this.data.tvShowId).subscribe((data)=>{
      this.tvShow = data.tvshow;
    })
  }

}
