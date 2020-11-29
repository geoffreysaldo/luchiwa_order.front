import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CreateCommandPageComponent } from './components/create-command-page/create-command-page.component';
import {CategoriesResolver} from '../theme/infra/categories.resolver';

const routes: Routes = [
{   path:'',
    component: CreateCommandPageComponent,
    resolve: {
        categories: CategoriesResolver
    }
}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CreateCommandRoutingModule {}