import { Component } from '@angular/core';
import { AppConstants } from '../Constants/app.constants';
import { SingIn } from '../models/sing-in.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user?: SingIn 
  userLoggedIn:boolean = false;
  
  constructor(private constatns:AppConstants, private route:Router){}

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
       if(val.url){
          this.user = JSON.parse(sessionStorage.getItem(this.constatns.userObject) ?? "");
          if(this.user?.jwt) {// user login
            this.userLoggedIn = true  
          }
       }
    })
  }

  signOutAction(){
    Swal.fire({
      title : 'Are you sure you want to Sign Out?',
      showCancelButton: true,
      confirmButtonText: 'Sign Out',
      confirmButtonColor: '#02b4ec'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userLoggedIn = false
        sessionStorage.setItem(this.constatns.userObject,'')
        this.route.navigate([''])
      }
    })
  }



}
