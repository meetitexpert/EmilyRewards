import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { AppConstants } from '../Constants/app.constants';
import { Tracking } from '../models/tracking.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  mac = false;

  constructor(private route:Router, private apiService:ApisService, private constant:AppConstants){}

  ngOnInit(): void {
    /*
    GetTrackingId API handling 
     */
    this.apiService.post(this.constant.getTrackingId).subscribe((result) => {
      let res = result as Tracking
      // localStorage.setItem(this.constant.trackingIdVal, res.trackingId ?? "");
      sessionStorage.setItem(this.constant.trackingIdVal, res.trackingId ?? "")
      
      //GET APP info detail 
      this.apiService.post(this.constant.getAppInfo).subscribe((result) => {
        console.warn('GET APP INFO DETAIL : ' + JSON.stringify(result))
      }) 
    })
    

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
