import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../../createCommand/infra/order.service';
import { Order } from '../../../createCommand/models/order.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnChanges {
  @Input() mode;
  @Input() orders: Order[];
  totalTTCMode: number = 0;
  @Output() deleteEmitter = new EventEmitter();
  constructor(
  ) { }

  ngOnChanges(): void {
    if(this.orders){
      this.totalTTCMode = 0;
      this.orders.map(order => {
        this.totalTTCMode = this.totalTTCMode + order.total
      })
  }
  }

  deleteOrder($event){
    this.deleteEmitter.emit($event)
  }
}
