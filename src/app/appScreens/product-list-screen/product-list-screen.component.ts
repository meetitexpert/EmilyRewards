import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { promotionObj } from 'src/app/models/promotion.model';


@Component({
  selector: 'app-product-list-screen',
  templateUrl: './product-list-screen.component.html',
  styleUrls: ['./product-list-screen.component.css']
})
export class ProductListScreenComponent {
  
  promotion?:promotionObj
  productsList = ["","","","","","","","","","","","","","","","","",""]
  url = 'https://chriscolotti.us/wp-content/uploads/2021/02/promotional-analysis.jpg'
  promotionDetailTitlesArray = ["Promotion Description","Promotion Terms & Conditions","Rewards Terms & Conditions","Redeem Terms & Conditions","Gift Cards Terms & Conditions","Location"]
  promotionDescriptionsArray : Array<String> = []

  constructor(private router : ActivatedRoute){
    this.promotionDescriptionsArray.push(this.promotion?.longDescription ?? "N/A", this.promotion?.promotionRewardsTC ?? "N/A", this.promotion?.redeemTC ?? "N/A", this.promotion?.couponTC ?? "N/A", this.promotion?.address ?? "N/A")
  }

}
