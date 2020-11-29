import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from '../../../createCommand/models/product.interface';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnChanges {
  @Input() products;
  @Output() productEmitter = new EventEmitter();
  constructor() { }

  ngOnChanges(): void {
  }

  addProduct(product: ProductInterface){
    this.productEmitter.emit(product)
  }
}
