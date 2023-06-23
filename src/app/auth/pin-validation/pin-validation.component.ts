import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { SingUp } from 'src/app/models/sing-up.model';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pin-validation',
  templateUrl: './pin-validation.component.html',
  styleUrls: ['./pin-validation.component.css']
})
export class PinValidationComponent {
  
  constructor(private constant:AppConstants, private apiService:ApisService, private route:Router){}
  
   
  verifyPin(data:any){
    let user = JSON.parse(sessionStorage.getItem(this.constant.userObject) ?? "");
    console.warn(data.pinField)
    let params = new Map(Object.entries({"email":user.email, "mobile_tel":user.mobile_tel ,"message_code":data.pinField}))
    this.apiService.post(this.constant.verifyPinCode, params).subscribe((result)=>{
      console.warn(JSON.stringify(result))
      let response  =  result as SingUp

      if (response.status != "0"){
        Swal.fire({
          title:response.details?.description,
          cancelButtonColor : '#02b4ec',
        })
        
      }else{
         user.jwt = response.jwt
         sessionStorage.setItem(this.constant.userObject, JSON.stringify(user))
         this.route.navigate(['home-screen'])
      }
    })
  }
}
