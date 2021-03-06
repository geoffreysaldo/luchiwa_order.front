import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../theme/infra/product.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductInterface, ProductBagInterface} from '../../models/product.interface';
import { Mode } from '../../models/mode.model'
import { OrderInformation } from '../../models/orderInformation.interface';
import { Order } from '../../models/order.interface';
import { OrderService } from '../../infra/order.service';
import { OrderPrintService } from '../../infra/order-print.service';

import {filter} from 'rxjs/operators'

@Component({
  selector: 'app-create-command-page',
  templateUrl: './create-command-page.component.html',
  styleUrls: ['./create-command-page.component.scss'],
  providers: [ProductService]
})
export class CreateCommandPageComponent implements OnInit {
  mode: Mode;
  order: Order = {hour: null, mode: null, products: null, total:null, totalHT: null, client: null, table: null, cutlery: null, discount: null, payment: null,};
  orders: Order[];
  categories: string[] = [];
  products: ProductInterface[] = [];
  selectedProducts: ProductBagInterface[] = [];
  orderInformation: OrderInformation;
  totalTTC: number = 0;
  totalHT: number = 0;
  discount: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private orderPrintService: OrderPrintService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          this.setMode()
    });
    this.setMode()
    this.route.data.subscribe((data:{categories: string[]}) => this.categories = data.categories)
  }


  categoryChange($event){
    this.productService.getProducts($event).subscribe(productsResult => this.products = productsResult)
  }

  addProduct($event){
    const productSelected = this.selectedProducts.find(productBag => productBag.product._id === $event._id)
    if(productSelected){
      this.selectedProducts.map(productBag => {
        productBag.product._id === $event._id ? productBag.quantity = productBag.quantity + 1 : null})
        this.totalTTC = this.totalTTC + $event.price
    } else {
      this.selectedProducts.push({product: $event, quantity: 1})
      this.totalTTC = this.totalTTC + $event.price
    }
  }

  updateQuantityProduct($event){
    switch ($event.action){
      case 'ADD':
        this.selectedProducts.map(productBag => {
          productBag.product._id === $event.product.product._id ? productBag.quantity = productBag.quantity + 1 : null})
          this.totalTTC = this.totalTTC + $event.product.product.price
        break;
      case 'SUB':
        this.selectedProducts.map(productBag => {
          productBag.product._id === $event.product.product._id ?
            productBag.quantity > 1 ? productBag.quantity = productBag.quantity -1 : this.deleteProduct(productBag.product._id) : null})
          this.totalTTC = this.totalTTC - $event.product.product.price
        break
    }
  }

  deleteProduct(id){
    this.selectedProducts = this.selectedProducts.filter(productBag => productBag.product._id !== id)
  }

  setMode(){
    switch (this.route.snapshot.paramMap.get('mode')) {
      case 'delivery':
        this.mode = Mode.LIVRAISON;
        break;
      case 'pick_up':
        this.mode = Mode.EMPORTER;
        break;
      case 'on_site':
        this.mode = Mode.SUR_PLACE
      break;
    }
    this.orderService.getOrder(this.mode).subscribe(result => {
      this.orders = result
    })
  }

  setOrderInformation($event){
    if(this.totalTTC !== 0) {
      switch (this.mode){
        case 'LIVRAISON':
          this.order.cutlery = $event.cutlery;
          this.order.hour = $event.hour;
          this.order.discount = $event.discount;
          this.order.payment = $event.payment
          delete $event.payment;
          delete $event.hour;
          delete $event.cutlery;
          delete $event.discount
          this.order.client = $event;
          delete this.order.table;
          break;
        case 'EMPORTER':
          this.order.hour = $event.hour;
          this.order.cutlery = $event.cutlery;
          this.order.discount = $event.discount;
          this.order.payment = $event.payment
          delete $event.payment;
          delete $event.hour;
          delete $event.cutlery;
          delete $event.discount
          this.order.client = $event;
          delete this.order.table;
          break;
        case 'SUR_PLACE':
          this.order.cutlery = $event.cutlery;
          this.order.table = $event.table;
          this.order.discount = $event.discount;
          this.order.payment = $event.payment
          delete $event.payment;
          delete $event.discount
          delete this.order.client;
          break;
      }
      this.totalHT = 0;
      this.order.mode = this.mode;
      this.order.products = this.selectedProducts;
      this.totalTTC = this.totalTTC - ((this.totalTTC * this.discount) / (100))
      this.order.total = Number(this.totalTTC.toFixed(2));
      this.order.products.map(selectedProduct => {
        this.totalHT = this.totalHT + Number(((selectedProduct.product.price * selectedProduct.quantity) / (1 + selectedProduct.product.tva / 100)));
      })
      this.totalHT = this.totalHT - ((this.totalHT * this.discount) / (100))
      this.order.totalHT = Number(this.totalHT.toFixed(2));
      this.orderService.postOrder(this.order).subscribe(result => {
        this.orders = [result,...this.orders]
        this.order = {hour: null, mode: null, products: null, total:null, totalHT: null, client: null, table: null, cutlery: null, discount: null, payment: null};
        this.selectedProducts = [];
        this.totalTTC = 0;
        this.totalHT = 0
      })
    } else {
      alert('La commande ne contient pas de produit')
    }
  }

  printTicket(order){
    this.orderPrintService.buildTicket(order);
  }

  deleteOrder(id){
    this.orderService.delete(id).subscribe(() => {
      this.orders = this.orders.filter(order => order._id !== id)
    })
  }

  setDiscount($event) {
    this.discount = $event
  }
}
