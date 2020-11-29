import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent {
  @Input() categories;
  @Output() categoryEmitter = new EventEmitter();
  currentCategory: string;
  constructor() { 
  }

  categoryClick(category: string){
    this.currentCategory = category;
    this.categoryEmitter.emit(category)
  }
}
