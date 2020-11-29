import { Injectable, resolveForwardRef } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';


@Injectable()
export class CategoriesResolver implements Resolve<string[]> {

    constructor(private categoriesService: ProductService){}
    
    resolve(): Observable<string[]>{
        return this.categoriesService.getCategories();
    }
}