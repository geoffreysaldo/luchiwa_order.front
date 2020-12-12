import { Component, OnInit } from '@angular/core';
import { Order } from '../../../createCommand/models/order.interface'
import { OrderService } from '../../../createCommand/infra/order.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-commands-dashboard',
  templateUrl: './commands-dashboard.component.html',
  styleUrls: ['./commands-dashboard.component.scss']
})
export class CommandsDashboardComponent implements OnInit {
  orders: Order[];
  deliveries: Order[] = [];
  pickUps: Order[] = [];
  onSite: Order[] = [];
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data:{orders: Order[]}) => this.orders = data.orders);
    this.orders.map(order => {
      switch (order.mode) {
        case 'LIVRAISON':
          this.deliveries.push(order)
          break;
        case 'EMPORTER':
          this.pickUps.push(order)
          break;
        case 'SUR_PLACE':
          this.onSite.push(order)
          break;
      }
    })
  }

  deleteOrder(id){
    this.orderService.delete(id).subscribe(() => {
      this.orders = this.orders.filter(order => order._id !== id)
    })
  }
}
