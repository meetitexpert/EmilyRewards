import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';
import { Md5 } from 'ts-md5';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public showPasswordOnPress?: boolean;

  constructor(private formBuilder: FormBuilder, private route: Router, private constants: AppConstants, private apiService: ApisService) { }

  signInform = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  })

  get userEmail() {
    return this.signInform.controls.email;
  }

  get userPassword() {
    return this.signInform.controls.password;
  }

  submitForm() {

    let trackinId = sessionStorage.getItem(this.constants.trackingIdVal)
    let pwd = Md5.hashStr(this.userPassword.value ?? "123")
    this.apiService.post(this.constants.memberLogin, new Map(Object.entries({ 'user_name': this.userEmail.value, 'password': pwd, 'role': "20", 'tracking_id': trackinId }))).subscribe((result) => {
      console.warn(JSON.stringify(result))
      let signInModel = result as SingIn
      signInModel.email = this.userEmail.value ?? ""
      if (signInModel.status != '0') {
        Swal.fire({
          title:signInModel.details?.description,
          cancelButtonColor : '#02b4ec',
        })
      } else {
        sessionStorage.setItem(this.constants.userObject, JSON.stringify(signInModel))
        // Swal.fire('user loggedin successfully')
        // if (signInModel.verify_status != '0') {
        //   this.route.navigate(['home-screen'])
        // } else {
        //   this.route.navigate(['pin-validation'])
        // }
        this.getKeywords(signInModel.verify_status ?? "0")

      }
    })
  }

  getKeywords(verify_status: string) {
    let params = new Map(Object.entries({
      "lang": "en",
      "club_code": "101",
      "apiVersion": "3",
      "catalogType": this.constants.setCatalogueType(),
      "sort": "az",
    }))
    this.apiService.post(this.constants.getkeywords, params).subscribe((response) => {
      console.log(JSON.stringify(response))
      if (verify_status != '0') {
        this.route.navigate(['home-screen'])
      } else {
        this.route.navigate(['pin-validation'])
      }
    })
  }

  forgotPasswordAction() {
    this.route.navigate(['auth-forgot']);
  }

  showHidePassword() {
    if (!this.showPasswordOnPress) {
      this.showPasswordOnPress = true;
    } else {
      this.showPasswordOnPress = false;
    }

  }
}

