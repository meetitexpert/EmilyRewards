import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private builder: FormBuilder, private apiService:ApisService) { }

  FormData = this.builder.group({
    Fullname: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Comment: new FormControl('', [Validators.required])
  })


  onSubmit(data: any) {
    console.log(data)
    this.apiService.PostMessage(data)
      .subscribe((response)=>{
        console.warn(JSON.stringify(response))
        
      })
  }

}


