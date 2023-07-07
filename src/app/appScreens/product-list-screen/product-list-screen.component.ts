import { Attribute, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { Attributes, Products, productObj } from 'src/app/models/products.model';
import { promotionObj } from 'src/app/models/promotion.model';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';


@Component({
  selector: 'app-product-list-screen',
  templateUrl: './product-list-screen.component.html',
  styleUrls: ['./product-list-screen.component.css']
})
export class ProductListScreenComponent {

  promotion?: promotionObj
  productsList : productObj[] = []
  promotionDetailTitlesArray = ["Promotion Description", "Promotion Terms & Conditions", "Rewards Terms & Conditions", "Redeem Terms & Conditions", "Gift Cards Terms & Conditions", "Location"]
  promotionDescriptionsArray: Array<String> = []
  user?: SingIn //user Object
  qtyCount:number = 0

  constructor(private activeRouter: ActivatedRoute, private apiService: ApisService, private constatns: AppConstants, private router:Router) {
    this.user = JSON.parse(sessionStorage.getItem(this.constatns.userObject) ?? "")
    
    let product = new productObj()
    product.productName = 'Product 1'
    product.descriptionField = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    product.images = ['https://m.media-amazon.com/images/G/31/img17/Home/LA/naireshm_LA/image_23a._SY900_QL85_FMpng_.png','https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80','https://media.istockphoto.com/id/1370669395/photo/different-hair-care-products-on-wooden-table.webp?b=1&s=170667a&w=0&k=20&c=-VKPETob_3F361SvnatkwIYWjipBZKloBtgm1jsKmf4=']
    product.offerQuantity = 0

    let atrb = new Attributes()
    atrb.name = 'Colors'
    atrb.values = ['Black','Brown','Red','Orrange','Pink','Black','Brown','Red','Orrange','Pink','Black','Brown','Red','Orrange','Pink','Black','Brown','Red','Orrange','Pink']

    let atrb2 = new Attributes()
    atrb2.name = 'Sizes'
    atrb2.values = ['Small','Medium','Large','X Large','XX Large','XXX Large']

    product.attributes = [atrb, atrb2]

    let productArray = [product, product, product, product, product, product, product, product]
    this.productsList = productArray
    
    this.promotionDescriptionsArray.push(this.promotion?.longDescription ?? "N/A", this.promotion?.promotionRewardsTC ?? "N/A", this.promotion?.redeemTC ?? "N/A", this.promotion?.couponTC ?? "N/A", this.promotion?.address ?? "N/A")
    
  }

  ngOnInit(){
    this.getProductsList()
  }



  getProductsList() {
    let userID = this.user?.user_id
    let trackingID = sessionStorage.getItem(this.constatns.trackingIdVal)
    var type = "C1"
    var catalogType = "1,2,3"

    let params = new Map(Object.entries({
      "memberUserId": userID,
      "lang": "en",
      "type": type,
      "version": "1",
      "clientClass": "2",
      "appId": this.constatns.appId,
      "promotionId": this.promotion?.promotionId,
      "trackingId": trackingID,
      "catalogType": catalogType,
    }))

    this.apiService.post(this.constatns.getProducstsList, params).subscribe((result) => {
      console.warn(result)
      let prodts = result as Products
      // this.productsList = prodts.productsList
      
    })

  }

  btn_show_more(product:productObj){
    this.router.navigate(['product-detail', {selectedProduct:JSON.stringify(product)}])
  }

  btn_addQty_Action(product:productObj) {
    product.offerQuantity += 1
  }

  btn_subtractQty_Action(product:productObj) {
    if(product.offerQuantity > 0){
      product.offerQuantity -= 1
    }
  }

  btn_direction_Action() {
    var p = this.constatns.latitude + "," + this.constatns.longitude;
    var d = 'destination';
    window.open('https://www.google.com/maps/dir/?api=1&origin=' + p + '&destination=' + d + '&travelmode=driving', '_blank');
  }

  btn_call_Action() {

  }


}
