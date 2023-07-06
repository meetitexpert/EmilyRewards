import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { PromotionOffers, promotionObj } from 'src/app/models/promotion.model';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-products-screen',
  templateUrl: './products-screen.component.html',
  styleUrls: ['./products-screen.component.css']
})
export class ProductsScreenComponent {
  promotion?: PromotionOffers
  totalNumberOfRows = 0
  totalList = 0
  user?: SingIn //user Object

  constructor(public constants: AppConstants, private apiService: ApisService, private router:Router) {
    this.user = JSON.parse(sessionStorage.getItem(this.constants.userObject) ?? "")
   
  }

  ngOnInit() {
    this.getPromotions()
  }

  getPromotions() {
    let params = new Map(Object.entries({
      "tracking_id": sessionStorage.getItem(this.constants.trackingIdVal),
      "lang": "en",
      "club_code": "101",
      "sort": "az",
      "type": "instore",
      "version": "6.3",
      "keyword": '',
      "count": "20",
      "page_number": "1",
      "user_id": this.user?.user_id?.toString(),
      "appId": this.constants.appId,
      "show_all_locations": "1",
      "latitude": this.constants.latitude,
      "longitude": this.constants.longitude,
      "radius": "25",
      "catalogType": this.constants.setCatalogueType()
    }))

    this.apiService.post(this.constants.searchOffersAPi, params).subscribe((result) => {
      console.warn(JSON.stringify(result))
      this.promotion = result as PromotionOffers

      let promotion1 = new promotionObj()
      promotion1.promotionCustomCard = 'https://t4.ftcdn.net/jpg/02/62/03/53/360_F_262035364_gGi8uJsPl9uljis8C6oxI0w6AM7MKDLq.jpg'
      promotion1.shortDescription = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
      promotion1.partnerName = 'Munday Body Care'

      let promotion2 = new promotionObj()
      promotion2.promotionCustomCard = 'https://chriscolotti.us/wp-content/uploads/2021/02/promotional-analysis.jpg'
      promotion2.shortDescription = 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
      promotion2.partnerName = 'Munday Body Care'

      this.promotion.offers?.push(promotion1)
      this.promotion.offers?.push(promotion2)
      this.promotion.offers?.push(promotion1)
      this.promotion.offers?.push(promotion2)
      this.promotion.offers?.push(promotion1)
      this.promotion.offers?.push(promotion2)
      this.promotion.offers?.push(promotion1)
      this.promotion.offers?.push(promotion2)
      this.promotion.offers?.push(promotion1)
      this.promotion.offers?.push(promotion2)


      this.totalList = this.promotion?.offers?.length ?? 0
      this.totalNumberOfRows = Math.ceil(this.totalList / 3)

    })
  }

  createPromotionsSetof3(index: number) {
    let startIndex = index * 3
    let listOfPromotions: promotionObj[] = []
    for (var i = 0; i < 3; i++) {
      if (startIndex < this.totalList) {
        let prom = this.promotion?.offers?.at(startIndex) as promotionObj
        listOfPromotions.push(prom)
        startIndex = startIndex + 1
      }
    }

    return listOfPromotions
  }

  openProductAndList(promotion:promotionObj){
    this.router.navigate(['product-list'])
  }
}
