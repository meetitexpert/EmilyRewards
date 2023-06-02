import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { SingUp } from 'src/app/models/sing-up.model';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  trackinId : string
    
  constructor(private formBuilder: FormBuilder, private constants: AppConstants, private apiService: ApisService, private route:Router) {
    this.trackinId = sessionStorage.getItem(this.constants.trackingIdVal) ?? ""
   }

  signUpform = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)], Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
    phoneNo: ['', [Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.minLength(10), Validators.maxLength(10)]],
  })

  get userEmail() {
    return this.signUpform.controls.email;
  }

  get userPassword() {
    return this.signUpform.controls.password;
  }

  get userFirstName() {
    return this.signUpform.controls.firstName
  }

  get userLastName() {
    return this.signUpform.controls.lastName
  }

  get userPhone() {
    return this.signUpform.controls.phoneNo
  }

  submitForm() {
    Swal.showLoading()
    let pwd = Md5.hashStr(this.userPassword.value ?? "123")
    let params = new Map(Object.entries({ "tracking_id": this.trackinId, "email": this.userEmail.value, "password": pwd, "first_name": this.userFirstName.value, "last_name": this.userLastName.value, "mobile_tel": this.constants.countryCode + this.userPhone.value, "send_type": this.constants.verificationTokenSendType }))
    this.apiService.post(this.constants.memberSignup, params).subscribe((result) => {
      console.warn(JSON.stringify(result))
      
      let signUpModel = result as SingUp
      signUpModel.email = this.userEmail.value ?? ""
      if(signUpModel.status != '0'){
        Swal.fire('',signUpModel.details?.description)
      }else{
        this.sendPin(signUpModel)
      }
    })
  }

  sendPin(model:SingUp){
    let params = new Map(Object.entries({"tracking_id": this.trackinId, "user_id":"", "email":this.userEmail.value, "mobile_tel":this.userPhone.value, "send_type": this.constants.verificationTokenSendType}))
    this.apiService.post(this.constants.sendPinMessage, params).subscribe((result)=>{
      console.warn(JSON.stringify(result))
      Swal.hideLoading()
      var signUpModel = result as SingUp
      if(signUpModel.status != '0'){
        Swal.fire('',signUpModel.details?.description)
      }else{
        sessionStorage.setItem(this.constants.userObject,JSON.stringify(model))    
        this.route.navigate(['pin-validation'])// Pin validation via EMAIL or SMS
      }
    })    
  }
}
