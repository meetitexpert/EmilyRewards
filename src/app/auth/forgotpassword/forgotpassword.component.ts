import { Component } from '@angular/core';
import { AppConstants } from 'src/app/Constants/app.constants';
import { Forgotpassword } from 'src/app/models/forgotpassword.model';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  constructor(private apiService:ApisService, private contants:AppConstants){

  }

  sendEmail(data:any){
    
    this.apiService.post(this.contants.forgotpasswrod, new Map(Object.entries({'email':data.email}))).subscribe((result) =>{
      let forgotModel = result as Forgotpassword
      if(forgotModel.status != 0){
        Swal.fire({
          title:forgotModel.details?.description,
          cancelButtonColor : '#02b4ec',
        })
      }else{
          Swal.fire({
            title:'The instructions on how to reset your password is sent to your email account.',
            cancelButtonColor : '#02b4ec',
          })
      }
    })
  }

}
