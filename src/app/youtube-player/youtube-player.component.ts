import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {

  @Input() videoId: string;
  apiLoaded = false;
  constructor() { }

  ngOnInit(): void {
    this.initYoutubePlayer();
  }

  initYoutubePlayer(){
    if(!this.apiLoaded){
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

}
