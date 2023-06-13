import { Component } from '@angular/core';
import { AppConstants } from 'src/app/Constants/app.constants';

@Component({
  selector: 'app-more-screen',
  templateUrl: './more-screen.component.html',
  styleUrls: ['./more-screen.component.css']
})
export class MoreScreenComponent {

  public myAngularxQrCode: string;
  
  
  constructor(public constants:AppConstants){
    this.myAngularxQrCode = 'https://emilyrewards.com';
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
