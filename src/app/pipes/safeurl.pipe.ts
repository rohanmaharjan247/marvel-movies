import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeurl'
})
export class SafeurlPipe implements PipeTransform {

  constructor(private domSanitzer: DomSanitizer){}

  transform(value:string, type:string): SafeHtml | SafeUrl | SafeResourceUrl | SafeStyle | SafeScript {
    debugger;
    switch(type){
      case 'html': return this.domSanitzer.bypassSecurityTrustHtml(value);
      case 'style': return this.domSanitzer.bypassSecurityTrustStyle(value);
      case 'url': return this.domSanitzer.bypassSecurityTrustUrl(value);
      case 'script': return this.domSanitzer.bypassSecurityTrustScript(value);
      case 'resourceUrl': return this.domSanitzer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified ${type}`)
    }
  }

}
