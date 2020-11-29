import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

enum Action{
  ADD = 'ADD',
  SUB = 'SUB'
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges {
  @Input() selectedProducts;
  @Input() totalTTC;
  @Output() productEmitter = new EventEmitter();
  constructor() { }

  ngOnChanges(): void {
  }

  addProduct(product){
    this.productEmitter.emit({action:Action.ADD, product})
  }

  removeProduct(product){
    this.productEmitter.emit({action:Action.SUB, product})
  }
}
