import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  goToLink(url: string){
    window.open(url, "_blank");
  }

  googleStoreAction(){
    window.open('https://play.google.com/store/apps/details?id=com.envisionmobile.emilyrewards.app&pli=1','_blank');
  }

  appleStoreAction(){
    window.open('https://apps.apple.com/us/app/emily-rewards/id1505739757', '_blank');
  }
}
