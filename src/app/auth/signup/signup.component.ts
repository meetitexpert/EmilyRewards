import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private formBuilder:FormBuilder){}

  signUpform =  this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    firstName:['', [Validators.required]],
    lastName:['', [Validators.required]],
    password:['', [Validators.required, Validators.minLength(8)],Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
    phoneNo:['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
  })

  get userEmail() {
    return this.signUpform.controls.email;
  }

  get userPassword() {
    return this.signUpform.controls.password;
  }

  get userFirstName(){
    return this.signUpform.controls.firstName
  }

  get userLastName(){
    return this.signUpform.controls.lastName
  }

  get userPhone(){
    return this.signUpform.controls.phoneNo
  }

  submitForm(){
    console.warn('SignUp button click')
  }
}
