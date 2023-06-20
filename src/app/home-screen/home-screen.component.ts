import { Component } from '@angular/core';
import { AppConstants } from '../Constants/app.constants';
import { ApisService } from '../services/apis.service';
import { SingIn } from '../models/sing-in.model';
import { Categories, catObj } from '../models/categories.model';
import { Retailer, retailerObj } from '../models/retailer.model';
import { Promotion, promotionObj } from '../models/promotion.model';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {

  
  categories? : Categories
  user : SingIn //user Object
  trackinId? : string
  recommendedPromotions? : Promotion
  favouriteRetailers?  : Retailer

  constructor(private constatns:AppConstants,  private apiService:ApisService, private router:Router){
    this.user =  JSON.parse(sessionStorage.getItem(this.constatns.userObject) ?? "")
    this.trackinId  = sessionStorage.getItem(this.constatns.trackingIdVal) ?? ""
  }

  ngOnInit(){

    this.recommendedPromotions = new Promotion()

    let promotion1 = new promotionObj()
    promotion1.promotionCustomCard = 'https://t4.ftcdn.net/jpg/02/62/03/53/360_F_262035364_gGi8uJsPl9uljis8C6oxI0w6AM7MKDLq.jpg'
    promotion1.shortDescription = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

    let promotion2 = new promotionObj()
    promotion2.promotionCustomCard = 'https://chriscolotti.us/wp-content/uploads/2021/02/promotional-analysis.jpg'
    promotion2.shortDescription = 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    
    let promotionsArray = [promotion1, promotion2]

    this.recommendedPromotions.returnData = promotionsArray as [promotionObj]

    this.getCategories()
    // this.getRecommendedrecommendedPromotions()
    this.getFavouriteRetailer()
  }

  getCategories(){
    
    let params = new Map(Object.entries({
      "trackingId":this.trackinId,
      "memberUserId":this.user.user_id,
      "lang":"en",
      "version":"1",
      "clientClass":"2",
      "type":"C1",

    }))
    this.apiService.post(this.constatns.getCategories, params).subscribe((response)=>{
      console.warn(JSON.stringify(response))
      this.categories = response as Categories
    })
  }

  getRecommendedrecommendedPromotions(){

    let userId = this.user.user_id?.toString()
    let params = new Map(Object.entries({
      "version":"2",
      "type":"2",
      "scope":"1",
      "userId":userId,
      "offset":"0",
      "count":"5",
      "clientClass":"1",
      "appId":this.constatns.appId,
      "catalogType":this.constatns.catalogType.join(','),
      "latitude":this.constatns.latitude,
      "longitude":this.constatns.longitude,
      "radius":"25",
      "trackingId":this.trackinId,
      "showAllLocations":"1"
    }))
    this.apiService.post(this.constatns.getRecommentedPromotions,params).subscribe((response)=>{
      console.warn(JSON.stringify(response))

    })
  }

  getFavouriteRetailer(){
    let params = new Map(Object.entries({
      "user_id":this.user.user_id?.toString(),
      "lang":"en",
      "tracking_id":this.trackinId,
      "club_code":"101",
      "apiVersion":"3",
      "favouriteType":"2",
      "appId":this.constatns.appId,
      "catalogType":this.constatns.catalogType
    }))
    this.apiService.post(this.constatns.getFavouriteRetailer, params).subscribe((response)=>{
      console.warn(JSON.stringify(response))
      this.favouriteRetailers = response as Retailer
      var retailer1 = new retailerObj()
      retailer1.partnerName = "Arieta Benson"
      retailer1.offerImageFrontUrl = 'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/5f91753f5ebfb_template_image_1603368255.webp'
      retailer1.partnerDescription = 'Buy 1 get 1 free'
      this.favouriteRetailers.offers?.push(retailer1)

      var retailer2 = new retailerObj()
      retailer2.partnerName = "Barbe Dwyer"
      retailer2.partnerDescription = 'You have earned 20000 points'
      retailer2.offerImageFrontUrl = 'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/5f91759fea990_template_image_1603368351.webp' 
      this.favouriteRetailers.offers?.push(retailer2)
    })
  }

  /*ACTIONS*/
  searchPromotionsWithCategory(category:catObj){
    this.router.navigate(['promotions-list',{category:JSON.stringify(category)}])
  }

  openRetailerPromotionList(retObj : retailerObj){
    this.router.navigate(['promotions-list', {retailer:JSON.stringify(retObj)}])
  }

  openProductAndList(promotion:promotionObj){
    this.router.navigate(['product-list'])
  }

}
