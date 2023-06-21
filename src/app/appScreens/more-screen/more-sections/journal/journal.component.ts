import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/Constants/app.constants';
import { Journal, journalObj } from 'src/app/models/journal.model';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {
  ordersList?: []
  user?:SingIn
  trackingId? : string
  journalData? : Journal

  constructor(private constants: AppConstants, private apiService: ApisService, private router:Router) { 
    this.user = JSON.parse(sessionStorage.getItem(constants.userObject) ?? "")
    this.trackingId = sessionStorage.getItem(constants.trackingIdVal) as string
  }

  ngOnInit() {
    this.loadJournalData()
  }

  loadJournalData() {
    const d = new Date();
    const month= '03' //d.getMonth().toString()
    const year = d.getFullYear().toString()
    let params = new Map(Object.entries({
      "trackingId": this.trackingId,
      "userId": this.user?.user_id,
      "version": "3",
      "type": 'C3',
      "dateTime": year + month,
      "clientClass": "2",
      "rewardTypes": "101,201,202,203"

    }))
    this.apiService.post(this.constants.getJournalData, params).subscribe((result) => {
      // console.warn(JSON.stringify(result))
      this.journalData = result as Journal
  
    })
  }

  openOrderDetail(order: journalObj) {
    this.router.navigate(['more-screen','journal-list','order-detail'])
  }

  setOrderStatus(order:journalObj){
    let status = ''
    let orderType = order.expressData?.expressType as string
    
      if(order.expressData?.receiveTime){
        status = 'Done'
      }else if(order.expressData?.expressNumber){
        if(orderType == '1'){
          status = 'Pickup'
        }else{
          status = 'Delivery'
        }
      }else if(order.expressData?.acceptTime){
        status = 'Accepted'
      }

    return status
  }

  showReward(order:journalObj){
    let rewartVal = ''
    switch (order.transactionRewardType) {
      case "201":
        rewartVal = 'Stamps: ' + order.transactionRewardValue
        break;
      case "202":
        rewartVal = 'Points: ' + order.transactionRewardValue
        break
      case "203":
        rewartVal = 'Cashback: $' + order.transactionRewardValue
        break
      default:
        break;
    }

    return rewartVal
  }
}
