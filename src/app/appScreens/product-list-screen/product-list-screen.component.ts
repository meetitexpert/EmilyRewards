import { Attribute, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment-timezone';
import { AppConstants } from 'src/app/Constants/app.constants';
import { MarkFavourite } from 'src/app/models/mark-favourite.model';
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
  productsList?: [productObj]
  promotionDetailTitlesArray = ["Promotion Description", "Promotion Terms & Conditions", "Rewards Terms & Conditions", "Redeem Terms & Conditions", "Gift Cards Terms & Conditions", "Location"]
  promotionDescriptionsArray: Array<String> = []
  user?: SingIn //user Object
  storeIsClosed: boolean = false
  storeOpensAt = ''
  nextDayCount = 0
  btnfavouriteText = ''


  constructor(private activeRouter: ActivatedRoute, private apiService: ApisService, public constatns: AppConstants, private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem(this.constatns.userObject) ?? "")
    this.promotion = JSON.parse(activeRouter.snapshot.params['promotion']) as promotionObj
    this.favouriteBtnTextSetting()

    this.promotion.address = this.promotion?.locations[0]["address"] ?? "";
    this.promotion.distance = this.promotion?.locations[0]["distance"] ?? "";
    this.promotionDescriptionsArray.push(this.promotion?.longDescription ?? "N/A", this.promotion?.promotionRewardsTC ?? "N/A", this.promotion?.promotionRedeemTC ?? "N/A", this.promotion?.promotionRestrictionTC ?? "N/A", "N/A", this.promotion.address ?? "N/A")

    this.storeOpenCloseTimeSetting()

  }

  favouriteBtnTextSetting() {
    if (this.promotion?.favourite == "1") {
      this.btnfavouriteText = 'Remove Favorite'
    } else {
      this.btnfavouriteText = 'Add To Favourite'
    }
  }

  ngOnInit() {
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
      "promotionId": this.promotion?.offerId,
      "trackingId": trackingID,
      "catalogType": catalogType,
    }))

    this.apiService.post(this.constatns.getProducstsList, params).subscribe((result) => {
      // console.warn(result)
      let prodts = result as Products
      this.productsList = prodts.returnData
      this.productsList?.forEach(item => {
        let productQuantityInCart = 0

        if (this.constatns.shoppingCartItems) {
          let cartProducts = this.constatns.shoppingCartItems.filter(cartItem => cartItem.productId === item.productId)
          console.warn(cartProducts)
          if (cartProducts.length > 0) {
            productQuantityInCart = cartProducts[0].offerQuantity
          }
        }

        item.offerQuantity = productQuantityInCart
        item.promotion = this.promotion
      })
    })

  }

  btn_show_more(product: productObj) {
    this.router.navigate(['product-detail', { selectedProduct: JSON.stringify(product) }])
  }

  btn_direction_Action() {
    var p = this.constatns.latitude + "," + this.constatns.longitude;
    var d = 'destination';
    window.open('https://www.google.com/maps/dir/?api=1&origin=' + p + '&destination=' + d + '&travelmode=driving', '_blank');
  }

  btn_call_Action() {

  }

  markFavorite() {
    let params = new Map(Object.entries({
      "status": this.promotion?.favourite == "1" ? "0" : "1",
      "tracking_id": sessionStorage.getItem(this.constatns.trackingIdVal),
      "club_code": "101",
      "favouriteId": this.promotion?.partnerId,
      "user_id": this.user?.user_id?.toString(),
      "type": "2",
    }))
    this.apiService.post(this.constatns.markFavourite, params).subscribe((result) => {
      // console.warn(result)
      let favourite = result as MarkFavourite
      if (favourite.status == '0') {

        this.promotion!.favourite = favourite.favourite_status ?? "0"
        this.favouriteBtnTextSetting()
      }
    })
  }

  public isStoreNotOpenYet(openTime: string, closeTime: string, timezone: string) {

    // get the current date and time in the given time zone
    const now = moment.tz(timezone);

    // Get the exact open and close times on that date in the given time zone
    // See https://github.com/moment/moment-timezone/issues/119
    const date = now.format("YYYY-MM-DD");
    const storeOpenTime = moment.tz(date + ' ' + openTime, "YYYY-MM-DD h:mmA", timezone);
    const storeCloseTime = moment.tz(date + ' ' + closeTime, "YYYY-MM-DD h:mmA", timezone);

    let check = now.isBefore(storeOpenTime);

    return check;
  }

  public isStoreOpenNow(openTime: string, closeTime: string, timezone: string) {

    // handle special case
    if (openTime === "24HR") {
      return "open";
    }

    // get the current date and time in the given time zone
    const now = moment.tz(timezone);

    // Get the exact open and close times on that date in the given time zone
    // See https://github.com/moment/moment-timezone/issues/119
    const date = now.format("YYYY-MM-DD");
    const storeOpenTime = moment.tz(date + ' ' + openTime, "YYYY-MM-DD h:mmA", timezone);
    const storeCloseTime = moment.tz(date + ' ' + closeTime, "YYYY-MM-DD h:mmA", timezone);

    let check;

    // Normal range check using an inclusive start time and exclusive end time
    check = now.isBetween(storeOpenTime, storeCloseTime, null, '[)');

    return check;
  }

  public isStoreCloseNow(openTime: string, closeTime: string, timezone: string) {

    // get the current date and time in the given time zone
    const now = moment.tz(timezone);

    // Get the exact open and close times on that date in the given time zone
    // See https://github.com/moment/moment-timezone/issues/119
    const date = now.format("YYYY-MM-DD");
    const storeOpenTime = moment.tz(date + ' ' + openTime, "YYYY-MM-DD h:mmA", timezone);
    const storeCloseTime = moment.tz(date + ' ' + closeTime, "YYYY-MM-DD h:mmA", timezone);

    let check = now.isAfter(storeCloseTime);

    return check;
  }

  storeOpenCloseTimeSetting() {
    let curretStatus = ''
    let currentDay = new Date().toLocaleDateString('en-us', { weekday: "long" });
    console.log(currentDay)

    // get the current date and time in the given time zone
    const now = moment.tz('America/Canada');

    switch (currentDay) {
      case "Sunday":
        if (this.promotion?.locations[0]["sunOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["sunStartTime"], this.promotion?.locations[0]["sunEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["sunStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["sunStartTime"], this.promotion?.locations[0]["sunEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["sunStartTime"], this.promotion?.locations[0]["sunEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;

      case "Monday":
        if (this.promotion?.locations[0]["monOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["monStartTime"], this.promotion?.locations[0]["monEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["monStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["monStartTime"], this.promotion?.locations[0]["monEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["monStartTime"], this.promotion?.locations[0]["monEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;
      case "Tuesday":
        if (this.promotion?.locations[0]["tueOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["tueStartTime"], this.promotion?.locations[0]["tueEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["tueStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["tueStartTime"], this.promotion?.locations[0]["tueEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["tueStartTime"], this.promotion?.locations[0]["tueEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;
      case "Wednesday":
        if (this.promotion?.locations[0]["wedOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["wedStartTime"], this.promotion?.locations[0]["wedEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["wedStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["wedStartTime"], this.promotion?.locations[0]["wedEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["wedStartTime"], this.promotion?.locations[0]["wedEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;
      case "Thursday":
        if (this.promotion?.locations[0]["thuOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["thuStartTime"], this.promotion?.locations[0]["thuEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["thuStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["thuStartTime"], this.promotion?.locations[0]["thuEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["thuStartTime"], this.promotion?.locations[0]["thuEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;
      case "Friday":
        if (this.promotion?.locations[0]["friOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["friStartTime"], this.promotion?.locations[0]["friEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["wedStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["friStartTime"], this.promotion?.locations[0]["friEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["friStartTime"], this.promotion?.locations[0]["friEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;
      case "Saturday":
        if (this.promotion?.locations[0]["satOpenStatus"] == '1') {
          if (this.isStoreNotOpenYet(this.promotion?.locations[0]["satStartTime"], this.promotion?.locations[0]["satEndTime"], 'America/Canada')) {
            this.storeOpensAt = 'Store opens at ' + this.constatns.getTimeInRequiredFormate(this.promotion?.locations[0]["satStartTime"])
            this.storeIsClosed = true
          } else if (this.isStoreOpenNow(this.promotion?.locations[0]["satStartTime"], this.promotion?.locations[0]["satEndTime"], 'America/Canada')) {
            this.storeIsClosed = false
          } else if (this.isStoreCloseNow(this.promotion?.locations[0]["satStartTime"], this.promotion?.locations[0]["satEndTime"], 'America/Canada')) {
            this.nextDayTime(this.nextDay(new Date()))
          }
        } else {
          this.nextDayTime(this.nextDay(new Date()))
        }
        break;
      default:
        break;
    }
  }

  nextDay(date: Date) {
    this.nextDayCount += 1
    var nextDate = date;
    nextDate.setDate(nextDate.getDate() + this.nextDayCount);
    let nextDay = nextDate.toLocaleDateString('en-us', { weekday: "long" });
    console.log(nextDay)
    return nextDay
  }

  nextDayTime(nextDay: string) {

    let time = ''

    switch (nextDay) {
      case "Sunday":
        if (this.promotion?.locations[0]["sunOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["sunStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }

        break
      case "Monday":
        if (this.promotion?.locations[0]["monOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["monStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }
        break
      case "Tuesday":
        if (this.promotion?.locations[0]["tueOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["tueStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }
        break
      case "Wednesday":
        if (this.promotion?.locations[0]["wedOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["wedStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }
        break
      case "Thursday":
        if (this.promotion?.locations[0]["thuOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["thuStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }
        break
      case "Friday":
        if (this.promotion?.locations[0]["friOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["friStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }
        break
      case "Saturday":
        if (this.promotion?.locations[0]["satOpenStatus"] == '1') {
          time = this.constatns.getTimeInRequiredFormate(this.promotion!.locations[0]["satStartTime"])
        } else {

          this.nextDayTime(this.nextDay(new Date()))
        }
        break

      default:
        break
    }

    this.storeOpensAt = 'Store opens on ' + nextDay + 'at ' + time
    this.storeIsClosed = true

  }


}
