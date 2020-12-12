import { Injectable, resolveForwardRef } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../createCommand/infra/order.service'
import { Order } from '../../createCommand/models/order.interface'

@Injectable()
export class OrdersResolver implements Resolve<Order[]> {

    constructor(private orderService: OrderService){}

    resolve(): Observable<Order[]>{
        return this.orderService.getOrders();
    }
}
