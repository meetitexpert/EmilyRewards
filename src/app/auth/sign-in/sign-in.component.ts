import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private formBuilder:FormBuilder, private route:Router){}

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
    console.warn('SignIn button click')
  }

  forgotPasswordAction(){
    this.route.navigate(['auth-forgot']);
  }
}
