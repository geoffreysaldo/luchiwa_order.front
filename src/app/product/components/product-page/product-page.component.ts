import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../../createCommand/models/product.interface';
import { ProductService } from '../../../theme/infra/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  categories: string[] = [];
  currentCategory: string;
  products: ProductInterface[] = [];
  product: ProductInterface;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data:{categories: string[]}) => this.categories = data.categories)
  }

  categoryChange($event){
    this.productService.getProducts($event).subscribe(productsResult => {
      this.products = productsResult;
      this.currentCategory = $event;
    });
  }

  selectedProduct($event){
    this.product = $event
  }

  updateProduct($event){
    this.productService.updateProduct($event).subscribe(updatedProduct => {
      this.products.filter(product => product._id === updatedProduct._id).map(product => {
        product.price = updatedProduct.price;
      });
      console.log(updatedProduct.category, this.currentCategory)
      if(updatedProduct.category !== this.currentCategory){
        this.products = this.products.filter(product => product._id !== updatedProduct._id);
      }
    })
  }

  addProduct($event) {
    this.productService.addProduct($event).subscribe(addedProduct => {
      if(addedProduct.category === this.currentCategory) {
        this.products.push(addedProduct);
      }
      if(!this.categories.includes(addedProduct.category)){
        this.categories.push(addedProduct.category);
      }
    })
  }

}
