import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  mac = false;

  constructor(private route:Router){}

  ngOnInit(): void {
    
    var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    if (mac) {
      this.mac=true;
    } else {
      this.mac=false;
    }
    console.log("mac: "+ this.mac)

}

  moveToSigUp(){
    this.route.navigate(['/', 'auth-sign-up'])
  }
}
