import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catObj } from 'src/app/models/categories.model';
import { retailerObj } from 'src/app/models/retailer.model';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css']
})
export class PromotionsListComponent {

  retailer? : retailerObj
  category? : catObj
  constructor(private activateRoute:ActivatedRoute){
    if(this.activateRoute.snapshot.params['retailer']){
      this.retailer = JSON.parse(this.activateRoute.snapshot.params['retailer']) as retailerObj
    }else {//if user come from category selection then this will parse
      this.category = JSON.parse(this.activateRoute.snapshot.params['category']) as catObj
    }
  }

  ngOnInit(){
    console.warn(this.retailer?.partnerName)
  }
}
