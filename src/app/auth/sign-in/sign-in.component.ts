import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';
import {Md5} from 'ts-md5';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private formBuilder:FormBuilder, private route:Router, private constants:AppConstants, private apiService:ApisService){}

  signInform =  this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  })

  get userEmail() {
    return this.signInform.controls.email;
  }

  get userPassword() {
    return this.signInform.controls.password;
  }

  submitForm(){
    Swal.showLoading()
    let trackinId = sessionStorage.getItem(this.constants.trackingIdVal)
    let pwd = Md5.hashStr(this.userPassword.value ?? "123")
    this.apiService.post(this.constants.memberLogin, new Map(Object.entries({'user_name':this.userEmail.value, 'password':pwd, 'role':"20", 'tracking_id':trackinId}))).subscribe((result)=>{
        console.warn(JSON.stringify(result))
        Swal.hideLoading()
      let signInModel = result as SingIn
      if(signInModel.status != '0'){
        Swal.fire('',signInModel.details?.description)
      }else{
        sessionStorage.setItem('',JSON.stringify(signInModel))
        // Swal.fire('user loggedin successfully')
        this.route.navigate(['home-screen'])
      }
    })
  }

  forgotPasswordAction(){
    this.route.navigate(['auth-forgot']);
  }
}
