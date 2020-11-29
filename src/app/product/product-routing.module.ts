import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoriesResolver} from '../theme/infra/categories.resolver';

const routes: Routes = [
    {
        path: '',
        component:ProductPageComponent,
        resolve: {
            categories: CategoriesResolver
        }
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],

})

export class ProductRoutingModule {}