import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductInterface } from '../../createCommand/models/product.interface';


@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getCategories(){
    return this.httpClient.get<any>('http://localhost:3000/category')
  }

  getProducts(category: string): Observable<ProductInterface[]>{
    return this.httpClient.get<ProductInterface[]>('http://localhost:3000/product/'+category)
  }

  addProduct(product: ProductInterface): Observable<ProductInterface>{
    console.log(product)
    return this.httpClient.post<ProductInterface>('http://localhost:3000/product/', product);
  }

  updateProduct(product: ProductInterface): Observable<ProductInterface>{
    return this.httpClient.put<ProductInterface>('http://localhost:3000/product/', product);
  }

  deleteProduct(id:string){
    return this.httpClient.delete('http://localhost:3000/product/'+ id);
  }
}
