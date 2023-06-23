import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { journalObj } from 'src/app/models/journal.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  public orderDetail?: journalObj

  constructor(private activateRoute: ActivatedRoute) {
    this.orderDetail = JSON.parse(this.activateRoute.snapshot.params['orderDetal']) as journalObj
    //calculat total items price
    let totalItemsPrice = 0
    this.orderDetail.catalogs?.forEach(item => {
      totalItemsPrice += item.totalAmount;
    });
    this.orderDetail.orderItemsTotalPrice = totalItemsPrice.toFixed(2).toString()

    //payment type settings
    this.orderDetail.payByCardORCash = this.orderDetail.payType == "1" ? "Debit/Credit Cards Payment:" : "Cash Payment:"
  }
}
