import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.interface';
import { Mode } from '../models/mode.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }


  postOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>('http://localhost:3000/command', order)
  }

  getOrder(mode: Mode): Observable<Order[]>{
    return this.httpClient.get<Order[]>('http://localhost:3000/command/' + mode)
  }

  getOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>('http://localhost:3000/command');
  }

  delete(id:string):Observable<void>{
    return this.httpClient.delete<void>('http://localhost:3000/command/' + id)
  }

  autocomplete(startClient: Object): Observable<any[]> {
    return this.httpClient.post<any[]>('http://localhost:3000/client/', startClient);
  }
}
