import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../../../createCommand/models/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  _product
  @Input() set product(product: ProductInterface){
    console.log(product)
    this._product = product;
  };
  constructor() { }

  ngOnInit(): void {

  }

}
