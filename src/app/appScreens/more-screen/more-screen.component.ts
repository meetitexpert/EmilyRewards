import { Component } from '@angular/core';
import { AppConstants } from 'src/app/Constants/app.constants';
import { SingIn } from 'src/app/models/sing-in.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-more-screen',
  templateUrl: './more-screen.component.html',
  styleUrls: ['./more-screen.component.css']
})
export class MoreScreenComponent {

  public myAngularxQrCode: string;
  public user? : SingIn
  
  constructor(public constants:AppConstants){
    this.user =  JSON.parse(sessionStorage.getItem(this.constants.userObject) ?? "")
    this.myAngularxQrCode = this.user?.user_id+"|"+this.user?.first_name+"|"+this.user?.last_name+"|"+this.user?.email+"|"+this.user?.mobile_tel+"|"+"0";
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }


  aboutApp(){
    Swal.fire({
      title:'App Version : 1.0.0'
    })
  }

}
