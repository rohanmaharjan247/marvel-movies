import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeId'
})
export class YoutubeIdPipe implements PipeTransform {

  transform(value: string): string {
    let strSplit;
    if(value.includes('youtu.be')){
      strSplit = value.split('https://youtu.be/');
      if(strSplit.length > 0){
        return strSplit[1];
      }
    }
    return '';
  }

}
