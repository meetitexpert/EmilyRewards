import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { journalObj } from 'src/app/models/journal.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  orderDetail? : journalObj
  constructor(private activeRoute : ActivatedRoute){
    this.orderDetail = JSON.parse(this.activeRoute.snapshot.params['orderDetail']) as journalObj
  }
}
