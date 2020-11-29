import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesResolver } from './infra/categories.resolver';

const routes: Routes = [
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[
        CategoriesResolver,
    ]
})

export class ThemeRoutingModule {}