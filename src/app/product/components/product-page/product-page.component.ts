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
    this.productService.getProducts($event).subscribe(productsResult => this.products = productsResult)
  }

  updateProduct($event){
    this.product = $event
  }

}
